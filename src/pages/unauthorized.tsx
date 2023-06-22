import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// interface props{
//     message:string
// }

export default function ununauthorized() {
    const router = useRouter();
    const { message } = router.query;
    const verificationSuccesNotification = () => {
        toast.error( message, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    }

    useEffect(() => {
        if (message) {
            verificationSuccesNotification();
        }
    }, [message])
    return (
        <div>
            {message}
        </div>
    );
}


