//here the patient can see his past appointments and make a new reservation


export default function myAppointmentsPage() {
    return (
        <div>
            <h1 className='text-4xl font-sans'>My Appointments</h1>
            <div className='flex justify-center items-center border-2 border-black h-screen'>
                <button className='bg-primaryPatient rounded-2xl text-2xl px-4 text-white font-sans'>Book Appointment</button>
            </div>
        </div>
    )
}