//here is a form for creating a visit
/*
    TODO:
    - if name or surname or pesel or insurance not in db, we open popup.
      - if cancel we go back to the list of appointments
      - if conform we go to settings page
    - else we open a form for booking appointment and fill read only lablels for name, surmane, pesel, insurance number

    endpoints : 
        retrieve available specialities
        retrieve available doctors for a speciality
        retrieve available time slots for a doctor
        create a visit
*/

import CustomButton from '@/components/CustomButton';
import Dropdown from '@/components/DropDown';
import LongTextInput from '@/components/LongtextInput';
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react';

import PopupDialog from '@/components/PopupDialog';
import CustomDatePicker from '@/components/AmazingDatePicker';
import CustomTimePicker from '@/components/AmazingTimePicker';
import { createVisitByPatient } from '@/lib/visits';
import { useSession } from 'next-auth/react';
//import AvailableDateTimePicker from '@/components/AmazingDatePicker';


const Label = ({ name, value }) => {
    return (
        <div className="mb-2">
            <label className="block mb-1 text-gray-500">{name}</label>
            <div className="text-gray-800 font-bold">{value}</div>
        </div>
    );
};

const BookingForm = () => {
    const session = useSession();

    const [selectedSpecialization, setSelectedSpecialization] = useState('Cardiologist');
    const [doctor, setDoctor] = useState('Jan Gniadek');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // submit handler logic
        createVisitByPatient("sdsd", "5", "2023-03-29T16:30:00.000Z")
    };

    const [open, setOpen] = useState(true); //co to kurwa jest fookin andrii ??

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        console.log("Confirmed!");
        setOpen(false);
        window.location.href = "/settings"; //ughhhhhhhh 
    };


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

    const [selectedTime, setSelectedTime] = useState(null);

    const handleTimeSelected = (time) => {
        setSelectedTime(time);
    };

    const [selectedDate, setSelectedDate] = useState(dates[0]);

    const handleDateSelected = (date) => {
        setSelectedDate(date);
    };



    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">


            <PopupDialog
                open={open}
                onClose={handleClose}
                title="Ooooops!"
                message="Before you book your first appointment, we need you to fill in your personal details. Do you want to do it now?"
                onConfirm={handleConfirm}
            />

            <h1 className="text-3xl font-bold mb-6">Booking Your Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Name" value={session.data?.user?.name} />
                    </div>
                    {/* <div className="w-full md:w-1/2 px-4 mb-4">
            <Label name="Surname" value={"Jackson"} />
          </div> */}
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="PESEL number" value={"20212145451"} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Insurance number" value={"5254522325"} />
                    </div>
                </div>



                <div className="mb-4">
                    {
                        /* Dropdown component goes here */
                        <Dropdown
                            label="Choose a Specialization*"
                            items={['Cardiologist', 'Dentist', 'Dermatologist', 'Endocrinologist', 'Gastroenterologist']}
                            selectedItem={selectedSpecialization}
                            onSelectedChange={setSelectedSpecialization}
                        />
                    }
                </div>

                <div className="mb-4">
                    {/* Dropdown component goes here */}
                    <Dropdown
                        label="Choose a Doctor*"
                        items={['Jan Paweł II', 'Jan Gniadek', 'Barbara Gniadek', 'Mikołaj Machowski', 'John Sins']}
                        selectedItem={doctor}
                        onSelectedChange={setDoctor}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2" htmlFor="date">
                        Choose a Date*
                    </label>
                    {/* Date picker component goes here */}
                    <CustomDatePicker
                        dates={dates}
                        onDateSelected={handleDateSelected}
                    />
                    <label className="text-gray-400">
                        Selected Date: {selectedDate.day} {selectedDate.month}
                    </label>
                </div>
                <div className="">
                    <label className="block mb-2" htmlFor="time">
                        Choose a Time*
                    </label>
                    <CustomTimePicker
                        times={getTimes()}
                        onTimeSelected={handleTimeSelected}
                    />
                </div>
                <label className="text-gray-400">
                    Selected Time: {selectedTime}
                </label>
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
