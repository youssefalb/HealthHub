import { useRouter } from 'next/router'
import { useEffect } from 'react';
// import { delay } from '@/lib/async';


const delay = (time) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(1), time);
    });

const getData = async () => {
    await delay(8000);
    
}

export default function AppointmentPage({ params }) {
    useEffect(() => {
        getData();
    }, []);

    // const bla = await getData(params.id)
    //get id from uri params and display it 
    // const id = params.id //this is how it will be done
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1 className='text-4xl font-sans'>Appointment {id}</h1>
            <div className='flex justify-center items-center border-2 border-black h-screen'>
                here there will be details about appointment number {id} 
            </div>
        </div>
    );
}
            

