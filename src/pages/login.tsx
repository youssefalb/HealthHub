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
        <div 
        className="bg-gray-50 flex flex-col items-center justify-center min-h-screen text-center ">

        <form onSubmit={handleSubmit} className='align-middle bg-white p-2 m-2 flex min-h-96 min-w-96 flex-grow flex-col rounded-xl'>
         <p className='font-semibold text-black text-lg p-8'>Hello</p>
                <input

                    type='email'
                    placeholder='Email'
                    className='p-2 m-2 rounded-2xl bg-gray-100'
                    value={email}   
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='p-2 m-2 rounded-2xl bg-gray-100'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />

                <button
                    type='submit'
                    className='p-2 mt-2 bg-teal rounded-lg'
                >
                    <span className="font-semibold bg-black text-purple-600 mx-6 text-sm">"Login"</span>
                </button>
            </form>

            
           
        </div>
    );
};


export default Login;
