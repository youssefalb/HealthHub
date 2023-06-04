import { useSession, getSession } from "next-auth/react";
import AppointmentCard from "./AppointmentCard";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import { getDoctorVisits, getOwnVisits } from "@/lib/visits";
import { useRouter } from "next/router";
import EmptyStateMessage from "./EmptyStateMessage";
import Link from 'next/link';
import { Role } from '@prisma/client';

//this page works for all 3 roles that need to view visits (patient, doctor, recept. )
export default function AppointmentsList() {
  const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const role = session?.user?.role;
  const user_id = session?.user?.id;
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await getOwnVisits(role);
      const results = await response.json();
      setAppointments(results["data"]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };       

  useEffect(() => {
    if (session) {
      fetchData();
      // getDoctorVisits("5")
    }
    //else loading state. show loading state
  }, [session]);

  // ToDo : loading component
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col-reverse gap-4">
      {appointments?.length ? (
        appointments.reverse().map((appointment) => (
          <Link key={appointment.visitId} href={`/visits/${appointment.visitId}`} >
          <AppointmentCard
            // ToDo: filter visits by status and display scheduled first, then completed, then cancelled 
            key={appointment.visitId}
            appointment={appointment}
            role={role}
            />
            </Link>
        ))
      ) : (
     <EmptyStateMessage
        title="No Appointments"
        description="You don't have any planned appointments, yet."
      />
      )}
      {(session.user?.role == Role.PATIENT || session.user?.role == Role.RECEPTIONIST) && (
        
        <CustomButton
        buttonText={"Book Appointment"}
        onClick={() => {
          router.push("/booking");
        }}
        />
        )}
      </div>
  );
}
