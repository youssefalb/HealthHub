import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div
            className="bg-gray-50 flex flex-col items-center justify-center min-h-screen text-center ">
            <form method="post" action="/api/auth/callback/credentials" className='align-middle bg-white p-2 m-2 flex min-h-96 min-w-96 flex-grow flex-col rounded-xl'>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <p className='font-semibold text-black text-lg p-8'>Hello</p>
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    className='p-2 m-2 rounded-2xl bg-gray-100' />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='p-2 m-2 rounded-2xl bg-gray-100'
                />

                <button type="submit" className='px-8 py-1 text-white bg-blue-400 rounded-2xl mr-2 my-3'>Login</button>
            </form>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <form method="post" action="/api/auth/signin/email" className="align-middle bg-white p-2 m-2 flex min-h-96 min-w-96 flex-grow flex-col rounded-xl">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    className='p-2 m-2 rounded-2xl bg-gray-100' />
                <button type="submit" className='px-8 py-1 text-white bg-blue-400 rounded-2xl mr-2 my-3'>Login with Email</button>
            </form>

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
