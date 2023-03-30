//create a register page
import { useState } from 'react';




export default function Register() {

  return (
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>
        <form className='flex flex-col mt-5 w-96'>
          <input
            type='text'
            name='name'
            placeholder='Name'

            className='input'
          />
          <input
            type='email'
            name='email'
        placeholder='Email'

            className='input'
          />
          <input
            type='password'

            name='password'
            placeholder='Password'
            className='input'
          />
          <button
            type='submit'
            className='btn'
          >
            Register
          </button>
        </form>
      </div>
  );
}
