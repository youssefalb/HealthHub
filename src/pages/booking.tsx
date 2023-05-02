//here is a form for creating a visit
/*
    it needs : 
    modular form components : text - email - phone - name - checkbox for insurance - select for speciality and doctors - date / time picker 

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

  // const availableDates = [
  //   { date: '2022-06-01', dayOfWeek: 'Wed' },
  //   { date: '2022-06-02', dayOfWeek: 'Thu' },
  //   { date: '2022-06-05', dayOfWeek: 'Sun' },
  //   { date: '2022-06-06', dayOfWeek: 'Mon' },
  //   { date: '2022-06-08', dayOfWeek: 'Wed' },
  //   { date: '2022-06-09', dayOfWeek: 'Thu' },
  //   { date: '2022-06-12', dayOfWeek: 'Sun' },
  //   { date: '2022-06-13', dayOfWeek: 'Mon' },
  //   { date: '2022-06-15', dayOfWeek: 'Wed' },
  //   { date: '2022-06-16', dayOfWeek: 'Thu' },
  //   { date: '2022-06-19', dayOfWeek: 'Sun' },
  //   { date: '2022-06-20', dayOfWeek: 'Mon' },
  //   { date: '2022-06-22', dayOfWeek: 'Wed' },
  //   { date: '2022-06-23', dayOfWeek: 'Thu' },
  //   { date: '2022-06-26', dayOfWeek: 'Sun' },
  //   { date: '2022-06-27', dayOfWeek: 'Mon' },
  //   { date: '2022-06-29', dayOfWeek: 'Wed' },
  //   { date: '2022-06-30', dayOfWeek: 'Thu' },
  // ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit handler logic
  };

  return (
    <div className="mx-auto max-w-screen-lg my-8 px-4">
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
          {/* Time picker component goes here */}
          <MyDateTimePicker
            selected={time}
            onChange={(time) => setTime(time)}
            className="border border-gray-400 p-2 rounded-lg w-full"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          />
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