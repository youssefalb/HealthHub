import { signIn } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';
import { NextResponse, NextRequest } from 'next/server'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit:FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    signIn('credentials', {
        email: email,
        password: password,
        callbackUrl: "/"
    })
    
  };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>
            <form onSubmit={handleSubmit} className='flex flex-col mt-5 w-96'>
                <input

                    type='email'
                    placeholder='Email'
                    className='p-2 mb-2 rounded-lg'
                    value={email}   
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='p-2 mb-2 rounded-lg'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />

                <button
                    type='submit'
                    className='p-2 mt-2 bg-purple-400 rounded-lg'
                >
                    Login
                </button>
            </form>
        </div>
    );
};


export default Login;
