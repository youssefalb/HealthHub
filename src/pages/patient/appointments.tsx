//here the patient can see his past appointments and make a new reservation

import CustomButton from "@/components/CustomComponents/CustomButton";
import AppointmentCard from "@/components/CustomComponents/AppointmentCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function myAppointmentsPage() {
    const { data: session } = useSession();
    const [appointments, setAppointments] = useState([]); 
   useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(session.user.role)
        console.log(session.user.id)
        if (session && session.user.role === "PATIENT") {
          console.log('Patient is here')
          const response = await fetch(`/api/patient/visits?id=${session.user.id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
          });
          const results = await response.json();
          console.log('BSSSSSSSS')

          console.log(results);
          console.log('BSSSSSSSS')
          const {user} = results[0].doctor
          console.log(user.name)
          setAppointments(results); 
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();

  }, [session]); 


function AppointmentsList({ appointments }) {
    if (appointments.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/empty.png" alt="Placeholder" className="w-58 h-48 mb-4" />
          <p className="text-2xl font-bold mb-2 mt-6">Nothing's in here</p>
          <p className="text-gray-500 text-lg mb-6">You don't have any planned appointments, yet.</p>
          <CustomButton buttonText={"Book Appointment"} onClick={() => {}} /> 
        </div>
      );
    }
  
    return (
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.visit_id} {...appointment} />
        ))}
        <p className="m-6"></p>
         <CustomButton buttonText={"Book another one"} onClick={() => {}} /> 
      </div>
    );
  }
      
  if (session) {
    if (session.user.role == "PATIENT") {
    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
         <h1 className="text-3xl font-bold mb-6">Upcoming Appointments</h1>
         <AppointmentsList appointments={appointments} />
        </div>
    )

  }
}
}