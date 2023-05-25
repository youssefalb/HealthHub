import CustomButton from '@/components/CustomButton';
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from 'react';
import PopupDialog from '@/components/PopupDialog';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getUserInfo } from '@/lib/userInfo';
import Label from '@/components/Label';
import { getSpecializationList, getTakenAppointments } from '@/lib/bookings';
import { Role } from '@prisma/client';
import { getDoctorsInSpeciality } from '@/lib/personnel';
import DateAndTimePicker from '@/components/DateTimePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { createVisitByPatient } from '@/lib/visits';
import dayjs from 'dayjs';

/*
 keep track of : 
    1- user info
    2- speciality
    3- doctor 
    4- date
    5- time

datepicker component receives : 
    1- month (default to now)    
    2- doctor ID 
    3- call back when (time is changed) --> changes date and time in parent

keeps track of : 
    1- blocked dates 
    2- blocked times 
    3- selected date
    4- selected time

fetches doctor's appointments in the passed month
*/



const BookingForm = () => {
//we can make userinfo ONE object for cleanliness 
    const router = useRouter();
    const { data: session } = useSession();
    const [pesel, setPesel] = useState('')
    const [insurance, setInsurance] = useState('')
    const [specialities, setSpecialities] = useState(getSpecializationList())
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [doctorList, setDoctorList] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState({ doctor: "" })
    const [note, setNote] = useState('');
    const [completeUserInfoPromptShown, setCompleteUserInfoPromptShown] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedMonth, setMonth] = useState(dayjs().month()) //needed for passing to datepicker
    const [selectedYear, setYear] = useState(dayjs().year()) //needed for passing to datepicker
    const [selectedDate, setSelectedDate] = useState('');

    const fetchUserData = async () => {
        const response = await getUserInfo()
        const result = await response.json()
        setPesel(result.data?.nationalId)
        if (session?.user?.role === Role.PATIENT) {
            if (!result.data?.patient.insuranceId)
                setCompleteUserInfoPromptShown(true)
            else
                setInsurance(result.data?.patient.insuranceId)
        }
    }

    const fetchDoctors = async (speciality: String) => {
        const response = await getDoctorsInSpeciality(speciality)
        const result = JSON.stringify(response)
        let doctorList = (JSON.parse(result))
        doctorList = doctorList["data"]
        //create and array of names of nested objects inside doctorList
        if (doctorList != null) {
            setDoctorList(doctorList)
        }
        else
            setDoctorList([])
        return result
    }

    useEffect(() => {
        fetchUserData()
    }, [session])

    useEffect(() => {
        // fetchTakenSlots(selectedDoctor)
    }, [selectedMonth])


    const handleSubmit = (e) => {
        e.preventDefault();
        // submit handler logic
        createVisitByPatient(note, selectedDoctor.doctor["employeeId"], dayjs(`${selectedDate} ${selectedTime}+2`).toISOString())
        //NOTE: IDK if this router is good or not
        router.push('/visits')
    };

    const handleGoToSettings = () => {
        setCompleteUserInfoPromptShown(false);
        router.push('/settings')
    };

    const handleSpecialityChange = (event: SelectChangeEvent) => {
        setSelectedSpecialization(event.target.value as string)
        setSelectedDoctor(selectedDoctor => ({
            doctor: ""
        }));

        fetchDoctors(event.target.value as string);
    };

    const handleDoctorChange = async (event: SelectChangeEvent) => {
        setSelectedDoctor(selectedDoctor => ({
            doctor: event.target.value
        }));
    };

    const handleNoteChange = (event: object) => {
        setNote(event['target'].value as string)
    };

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">

            <PopupDialog
                open={completeUserInfoPromptShown}
                onClose={handleGoToSettings}
                title="Ooooops!"
                message="Before you book your first appointment, we need you to fill in your personal details. Do you want to do it now?"
                onConfirm={handleGoToSettings}
            />

            <h1 className="text-3xl font-bold mb-6">Booking Your Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Name" value={session?.user?.name} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="PESEL number" value={pesel} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Insurance number" value={insurance} />
                    </div>
                </div>


                <div className="mb-4">
                    {
                        <FormControl fullWidth>
                            <InputLabel id="speciality">Speciality</InputLabel>
                            <Select
                                labelId="speciality"
                                id="speciality-select"
                                value={selectedSpecialization}
                                label="Speciality"
                                onChange={handleSpecialityChange}
                            >
                                {specialities.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
                </div>

                <div className="mb-4">
                    {selectedSpecialization&&
                        <FormControl fullWidth>
                            <InputLabel id="doctor">Choose a doctor</InputLabel>
                            <Select
                                labelId="doctor"
                                id="doctor-select"
                                value={selectedDoctor.doctor}
                                label="Choose a doctor"
                                onChange={handleDoctorChange}
                            >
                                {doctorList.map((doctor) => (
                                    <MenuItem
                                        key={doctor.employeeId}
                                        value={doctor}
                                    >
                                        {doctor.user.firstName + " " + doctor.user.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
                </div>

                <div className="mb-4">
                    {selectedDoctor.doctor&& 
                        <DateAndTimePicker
                            doctor={selectedDoctor.doctor}
                            month={selectedMonth}
                            year={selectedYear}
                            saveDate={setSelectedDate}
                            saveTime={setSelectedTime}
                            changeMonth={setMonth}
                            changeYear={setYear}
                        />}
                </div>

                <div className="mt-4">
                    {selectedTime&&
                    <TextField
                        id="note"
                        label="Note"
                        multiline
                        rows={4}
                        value={note}
                        onChange={handleNoteChange}
                        fullWidth={true}
                    />}
                </div>

                <div className="mt-4">
                    <CustomButton
                        buttonText={"Book Appointment"}
                        onClick={handleSubmit}
                    />
                </div>
            </form>

        </div>
    );
};

export default BookingForm;
