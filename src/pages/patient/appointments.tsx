//here the patient can see his past appointments and make a new reservation

import CustomButton from "@/components/CustomComponents/CustomButton";
import AppointmentCard from "@/components/CustomComponents/AppointmentCard";


export default function myAppointmentsPage() {
    const appointments = [
        {
          id: 1,
          date: 'April 20, 2023, 21:54',
          doctorName: 'Dr. John Doe',
          specialization: 'Cardiologist',
        },
        {
          id: 2,
          date: 'April 25, 2023, 21:54',
          doctorName: 'Dr. Jane Smith',
          specialization: 'Dermatologist',
        },
        {
          id: 3,
          date: 'April 30, 2023, 21:54',
          doctorName: 'Dr. Robert Lee',
          specialization: 'Neurologist',
        },
      ];
      
    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
         <h1 className="text-3xl font-bold mb-6">Upcoming Appointments</h1>
         <AppointmentsList appointments={appointments} />
        </div>
    )
}
  
  function AppointmentsList({ appointments }) {
    if (appointments.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/empty.png" alt="Placeholder" className="w-58 h-48 mb-4" />
          <p className="text-2xl font-bold mb-2 mt-6">Nothing's in here</p>
          <p className="text-gray-500 text-lg mb-6">You don’t have any planned appointments, yet.</p>
          <CustomButton buttonText={"Book Appointment"} onClick={() => {}} /> 
        </div>
      );
    }
  
    return (
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} {...appointment} />
        ))}
        <p className="m-6"></p>
         <CustomButton buttonText={"Book another one"} onClick={() => {}} /> 
      </div>
    );
  }