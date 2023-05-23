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

const BookingForm = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [pesel, setPesel] = useState('')
    const [insurance, setInsurance] = useState('')
    const [specialities, setSpecialities] = useState(getSpecializationList())
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [doctorList, setDoctorList] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState({ doctor: "" })
    const [note, setNote] = useState('');
    const [name, setName] = useState('');
    const [completeUserInfoPromptShown, setCompleteUserInfoPromptShown] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [takenSlots, setTakenSlots] = useState([])

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
        setName(session?.user?.name)
    }, [session])

    const handleSubmit = (e) => {
        e.preventDefault();
        // submit handler logic
        createVisitByPatient(note, selectedDoctor.doctor.employeeId, selectedDate + selectedTime)
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

    const fetchTakenSlots = async (doctor) => {
        if (doctor.employeeId) {
            const response = await getTakenAppointments(doctor.employeeId)
            const result = JSON.stringify(response)
            let slotsList = null
            if (result)
                slotsList = (JSON.parse(result))
            if (slotsList != null) {
                setTakenSlots(slotsList)
            }
            else {
                setTakenSlots([])
                console.log("empty")
            }
        }
    }

    const handleDoctorChange = async (event: SelectChangeEvent) => {
        setSelectedDoctor(selectedDoctor => ({
            doctor: event.target.value
        }));
        //fetch takenSlots
        await fetchTakenSlots(event.target.value)
    };

    const handleNoteChange = (event: object) => {
        setNote(event.target.value as string)
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
                        <Label name="Name" value={name} />
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
                    {
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
                    <DateAndTimePicker
                        doctor={selectedDoctor.doctor}
                        saveDate={setSelectedDate}
                        saveTime={setSelectedTime}
                        takenSlots={takenSlots}
                    />
                </div>

                <div className="mt-4">
                    <TextField
                        id="note"
                        label="Note"
                        multiline
                        rows={4}
                        value={note}
                        onChange={handleNoteChange}
                        fullWidth={true}
                    />
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
