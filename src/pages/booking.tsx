
import CustomButton from '@/components/CustomButton';
import Dropdown from '@/components/DropDown';
import LongTextInput from '@/components/LongtextInput';
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from 'react';

import PopupDialog from '@/components/PopupDialog';
import CustomDatePicker from '@/components/AmazingDatePicker';
import CustomTimePicker from '@/components/AmazingTimePicker';
import { createVisitByPatient } from '@/lib/visits';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getUserInfo } from '@/lib/userInfo';
import Label from '@/components/Label';
import { getAvailableappointments, getSpecializationList } from '@/lib/bookings';
import { Role, Specializations } from '@prisma/client';
import { getDoctorsInSpeciality } from '@/lib/personnel';
import DateAndTimePicker from '@/components/DateTimePicker';



 // Of course instead of this we should fetch data from the API, this is just a mock
    const dates = [
        { day: 1, month: "May" },
        { day: 2, month: "May" },
        { day: 3, month: "May" },
        { day: 4, month: "May" },
        { day: 5, month: "May" },
        { day: 6, month: "May" },
        { day: 7, month: "May" },
        { day: 8, month: "May" },
        { day: 9, month: "May" },
        { day: 10, month: "May" },
        { day: 11, month: "May" },
        { day: 12, month: "May" },
        { day: 13, month: "May" },
        { day: 14, month: "May" },
        { day: 15, month: "May" },
        { day: 16, month: "May" },
        { day: 17, month: "May" },
        { day: 18, month: "May" },
        { day: 19, month: "May" },
        { day: 20, month: "May" },
        { day: 21, month: "May" },
        { day: 22, month: "May" },
        { day: 23, month: "May" },
        { day: 24, month: "May" },
        { day: 25, month: "May" },
        { day: 26, month: "May" },
        { day: 27, month: "May" },
        { day: 28, month: "May" },
        { day: 29, month: "May" },
        { day: 30, month: "May" },
        { day: 31, month: "May" },
    ];


const BookingForm = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [pesel, setPesel] = useState('')
    const [insurance, setInsurance] = useState('')
    const [specialities, setSpecialities] = useState(getSpecializationList())
    const [selectedSpecialization, setSelectedSpecialization] = useState();
    const [doctorList, setDoctorList] = useState([])
    const [doctorNamesList, setDoctorNamesList] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDoctorId, setSeletctedDoctorId] = useState('');
    const [note, setNote] = useState('');
    const [name, setName] = useState('');
    const [completeUserInfoPromptShown, setCompleteUserInfoPromptShown] = useState(false); 
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState(dates[0]);


    // const handleChooseDoctor(){
    //     setSelectedDoctor()
    //     setSeletctedDoctorId()
    // }

    const fetchUserData = async () => {
        const response = await getUserInfo()    
        const result = await response.json() 
        console.log("result: ", result)
        setPesel(result.data?.nationalId)
        if (session?.user?.role === Role.PATIENT) 
            setInsurance(result.data?.patient.insuranceId)
    }

    const fetchDoctors = async (specialization) => {
        setSelectedSpecialization(specialization)
        const response = await getDoctorsInSpeciality(specialization)  
        const result = await JSON.stringify(response)
        let doctorList = (JSON.parse(result))
        doctorList = doctorList["data"]
        // console.log("result: ", doctorList)
        //create and array of names of nested objects inside doctorList
        if (doctorList != null) {
            setDoctorList(doctorList)
            let doctorListNames = doctorList.map(doctor => doctor.user.firstName + " " + doctor.user.lastName)
            setDoctorNamesList(doctorListNames)
        }
        else 
            setDoctorList([])
        return result
    }

    //Todo
    useEffect(()=>{
        fetchUserData()
        setName(session?.user?.name)
        //function to check user insurance
        getAvailableappointments("7")
        
    }, [session]) 


    const handleSubmit = (e) => {
        e.preventDefault();
        // submit handler logic
        // createVisitByPatient("sdsd", "5", "2023-03-29T16:30:00.000Z")
    };

    const handleClosePrompt = () => {
        setCompleteUserInfoPromptShown(false);
    };

    const handleGoToSettings = () => {
        console.log("Confirmed!");
        setCompleteUserInfoPromptShown(false);
        router.push('/settings')
    };

    //Todo : in lib
    // Similarly, this is just a mock, but in a form of a function not to wrrite so much garbage
    const getTimes = () => {
        const times = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j += 15) {
                const hour = i < 10 ? "0" + i : i;
                const minute = j === 0 ? "00" : j;
                times.push(`${hour}:${minute}`);
            }
        }
        return times;
    };

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">


            <PopupDialog
                open={completeUserInfoPromptShown}
                onClose={handleClosePrompt}
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
                        /* Dropdown component goes here */
                        <Dropdown
                            label="Choose a Specialization*"
                            items={specialities}
                            selectedItem={selectedSpecialization}
                            
                            onSelectedChange={fetchDoctors}
                        />
                    }
                </div>

                <div className="mb-4">
                    {/* Dropdown component goes here */}
                    <Dropdown
                        label="Choose a Doctor*"
                        items={doctorList}
                        selectedItem={selectedDoctor}
                        onSelectedChange={setSelectedDoctor}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2" htmlFor="date">
                        Choose a Date*
                    </label>
                    {/* Date picker component goes here */}
                    {/* <CustomDatePicker
                        dates={dates}
                        onDateSelected={setSelectedDate}
                    /> */}


                    {/* give it doctorId, on change month and on change time  */}
                    <DateAndTimePicker doctorId={selectedDoctor} />
                    
                    
                    
                    {/* <label className="text-gray-400">
                        Selected Date: {selectedDate.day} {selectedDate.month}
                    </label> */}
                </div>
                
                {/* <label className="text-gray-400">
                    Selected Time: {selectedTime}
                </label> */}
                
                <div className="mt-4">
                    <LongTextInput
                        id="note"
                        label="Note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <CustomButton
                    buttonText={"Book Appointment"}
                    onClick={handleSubmit}
                />

            </form>

        </div>
    );
};

export default BookingForm;
