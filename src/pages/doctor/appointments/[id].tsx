// here can see details of visit and edit it if status is "in progress "
// modal of messages is integrated here also 


import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';




// const delay = (time) =>
//     new Promise((resolve) => {
//         setTimeout(() => resolve(1), time);
//     });



export default function AppointmentPage() {
    const [loading, setloading] = useState(true);

    //this hook is run on the client side after initial render
    useEffect(  () => { //triggered on client side after rendering
        const getData = async () => {
        return null
}
        getData().then(() => {
            setloading(false);
         });
    }, []); //empty array to make it run once

    const router = useRouter();
    const { id } = router.query;

    if (loading) {
        return <h1>Loading</h1>
    }
    else {
    return (
        <div>
            <h1 className='text-4xl font-sans'>Appointment {id}</h1>
            <div className='flex justify-center items-center border-2 border-black h-screen'>
                here there will be details about appointment number {id} 
            </div>
        </div>
    );
    }
        
}
            

