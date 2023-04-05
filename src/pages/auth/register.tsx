//create a register page
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState, useMemo } from 'react';
import  CustomTextInput  from '../../../components/CustomComponents/CustomTextInput';
import React from 'react';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [national_id, setNationaId] = useState('');
    const [insurance_id, setInsuranceId] = useState('');

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const data = { fname, lname, email, password, national_id, insurance_id };
        const res = await fetch(`/api/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        console.log(fname);
    };
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>
            <form onSubmit={handleSubmit} className='flex flex-col mt-5 w-96'>
                <CustomTextInput type='text' name='fname' placeholder='First name' onChange={(e) => setFname(e.target.value)}  />
                <CustomTextInput type='text' name='lname' placeholder='Last name' onChange={(e) => setLname(e.target.value)}  />
                <CustomTextInput type='email' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}  />
                <CustomTextInput type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}  />
                <CustomTextInput type='text' name='national_id' placeholder='National ID' onChange={(e) => setNationaId(e.target.value)}  />
                <CustomTextInput type='text' name='insurance_id' placeholder='Insurance ID' onChange={(e) => setInsuranceId(e.target.value)}  />
                <button
                    type='submit'
                    className='p-2 mt-2 bg-purple-400 rounded-lg'
                >
                    Register
                </button>
            </form>
        </div>
    );
};  
