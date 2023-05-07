//create a register page
import { FormEventHandler, useState, useMemo } from 'react';
import  CustomTextInput  from '../../components/CustomTextInput';
import React from 'react';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFname] = useState('');
    const [lastName, setLname] = useState('');
    const [nationalId, setNationaId] = useState('');
    const [insuranceId, setInsuranceId] = useState('');

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const data = { firstName, lastName, email, password, nationalId, insuranceId };
        await fetch(`/api/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
    };
    return (
        <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-4 mt-1">Welcome to HealthHub!</h1>
        <p className="text-lg text-center">
          Please, provide us with all the necessary data to proceed.
        </p>
        <div className='flex items-center justify-center mt-10 '>
            <form onSubmit={handleSubmit} className='shadow-md p-10 bg-white p-2 m-2 flex flex-col rounded-xl justify-center'>
            <div className='grid grid-cols-2 gap flex flew'>
            <CustomTextInput type='text' name='fname' placeholder='First name' onChange={(e) => setFname(e.target.value)}  />
                <CustomTextInput type='text' name='lname' placeholder='Last name' onChange={(e) => setLname(e.target.value)}  />
                <CustomTextInput type='email' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}  />
                <CustomTextInput type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}  />
                <CustomTextInput type='text' name='national_id' placeholder='National ID' onChange={(e) => setNationaId(e.target.value)}  />
                <CustomTextInput type='text' name='insurance_id' placeholder='Insurance ID' onChange={(e) => setInsuranceId(e.target.value)}  />

                </div>
                <button
                    type='submit'
                    className='p-2 mt-5 m-2 text-white font-bold bg-blue-500 rounded-2xl'
                >
                    Register
                </button>
            </form>
        </div>
        </div>
        </div>
    );
};  
