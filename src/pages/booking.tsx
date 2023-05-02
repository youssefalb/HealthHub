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
import CustomDatePicker from '@/components/DatePicker';
import Dropdown from '@/components/DropDown';

import LongTextInput from '@/components/LongtextInput';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react';
import AmazingDatePicker from '@/components/AmazingDatePicker';
import MyDateTimePicker from '@/components/AmazingDatePicker';
import PopupDialog from '@/components/PopupDialog';

import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Label = ({ name, value }) => {
  return (
    <div className="mb-2">
      <label className="block mb-1 text-gray-500">{name}</label>
      <div className="text-gray-800 font-bold">{value}</div>
    </div>
  );
};

const BookingForm = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('Cardiologist');
  const [doctor, setDoctor] = useState('Jan Gniadek');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit handler logic
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log("Confirmed!");
    setOpen(false);
  };

  return (
    <div className="mx-auto max-w-screen-lg my-8 px-4">


      <PopupDialog
        open={false}
        onClose={handleClose}
        title="Ooooops!"
        message="Before you book your first appointment, we need you to fill in your personal details. Do you want to do it now?"
        onConfirm={handleConfirm}
      />



      <h1 className="text-3xl font-bold mb-6">Booking Your Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label name="Name" value={"Josephine"} />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label name="Surname" value={"Jackson"} />
          </div>
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
          <label className="block mb-2 font-bold" htmlFor="date">
            Choose a Date:
          </label>
          {/* Date picker component goes here */}
          {/* <AmazingDatePicker
            availableDates={availableDates}
            onDateSelect={setDate}
          /> */}
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="border border-gray-400 p-2 rounded-lg w-full"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="time">
            Choose a Time:
          </label>

        </div>

        <LongTextInput
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <CustomButton
          buttonText={"Book Appointment"}
          onClick={() => {
            //addVisit(role, 1, 7);
          }}
        />

      </form>

    </div>
  );
};

export default BookingForm;