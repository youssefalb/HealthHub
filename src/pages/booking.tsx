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
import Dropdown from '@/components/DropDown';
import InsuranceForm from '@/components/InsuranceForm';
import LongTextInput from '@/components/LongtextInput';
import TextInput from '@/components/textInput';
import React, { useState } from 'react';

const BookingForm = () => {
  const [idNumber, setIdNumber] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false);
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit handler logic
  };

  return (
    <div className="mx-auto max-w-screen-lg my-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Booking Your Appointment</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="PESEL Number*"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        <InsuranceForm
          hasInsurance={hasInsurance}
          setHasInsurance={setHasInsurance}
          insuranceNumber={insuranceNumber}
          setInsuranceNumber={setInsuranceNumber}
        />


        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="specialization">
            Choose Doctor's Specialization:
          </label>
          {
            /* Dropdown component goes here */
            <Dropdown
              label="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              options={["Cardiologist", "Dermatologist", "Gynecologist", "Neurologist", "Ophthalmologist", "Pediatrician", "Psychiatrist", "Surgeon"]}
            />
          }
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="doctor">
            Choose a Doctor:
          </label>
          {/* Dropdown component goes here */}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="date">
            Choose a Date:
          </label>
          {/* Date picker component goes here */}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="time">
            Choose a Time:
          </label>
          {/* Time picker component goes here */}
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