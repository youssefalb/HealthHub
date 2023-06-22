import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import CustomTextInput from '../../components/CustomTextInput';
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";


export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const { verified } = router.query;
    const [notificationShown, setNotificationShown] = useState(false);


    const verificationSuccesNotification = () => {
        toast.success('Your account has been successfully verified!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    if (verified && !notificationShown) {
        verificationSuccesNotification();
        setNotificationShown(true);
    }
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-center mb-4 mt-1">We're happy to see you again!</h1>
                <p className="text-lg text-center">
                    Choose you authentication method.
                </p>
                <div
                    className="bg-gray-50 flex  min-h-screen p-10">
                    <form method="post" action="/api/auth/callback/credentials" className='max-h-96 shadow-md p-5 align-middle bg-white p-2 m-2 flex min-h-96 min-w-96 flex-grow flex-col rounded-xl'>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <p className='font-bold text-black text-2xl pt-8 pb-1 px-4'>Email + Pass</p>
                        <p className='font-normal text-black text-md pt-1 pb-8 px-4'>Enter using your email & password</p>
                        <CustomTextInput type='email' name='email' placeholder='Email' />
                        <CustomTextInput type='password' name='password' placeholder='Password' />
                        <button type="submit" className='p-2 m-2 text-white font-bold bg-blue-500 rounded-2xl'>Login</button>
                    </form>

                    <form method="post" action="/api/auth/signin/email" className="max-h-96 shadow-md p-5 align-middle bg-white p-2 m-2 flex min-h-96 min-w-96 flex-grow flex-col rounded-xl">
                        <p className='font-bold text-black text-2xl pt-8 pb-1 px-4'>Passwordless Auth</p>
                        <p className='font-normal text-black text-md pt-1 pb-8 px-4'>Use just your email to authorize!</p>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <CustomTextInput type='email' name='email' placeholder='Email' />
                        <button type="submit" className='p-2 m-2 text-white font-bold bg-blue-500 rounded-2xl'>Login with Email</button>
                    </form>

                    <form method="post" action="/api/auth/signin/google" className="max-h-96 shadow-md p-5 align-middle bg-white p-2 m-2 flex min-h-96 min-w-96 flex-grow flex-col rounded-xl">
                        <p className='font-bold text-black text-2xl pt-8 pb-1 px-4'>Even simpler?</p>
                        <p className='font-normal text-black text-md pt-1 pb-8 px-4'>One-click sign in with Google</p>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <button type="submit" className='p-2 m-2 text-white font-bold bg-blue-500 rounded-2xl'>Login with Google</button>
                    </form>
                </div >
            </div >
        </div >
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        
        return { redirect: { destination: "/" } }
    }

    const providers = await getProviders();

    return {
        props: {
            providers: providers ?? [],
            csrfToken: await getCsrfToken(context),
        },
    }
}
