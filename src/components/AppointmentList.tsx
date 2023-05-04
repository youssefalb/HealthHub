import { useSession, getSession } from "next-auth/react";
import AppointmentCard from "./AppointmentCard";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import { addVisit, getDoctorVisits, getOwnVisits } from "@/lib/visits";
import { useRouter } from "next/router";

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
      getDoctorVisits("PATIENT", "5")
    }
    //else loading state. show loading state
  }, [session]);

  // ToDo : loading component
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col-reverse gap-4">
      {appointments.length ? (
        appointments.map((appointment) => (
          <AppointmentCard
            // ToDo: filter visits by status and display scheduled first, then completed, then cancelled 
            key={appointment.visitId}
            appointment={appointment}
            role={role}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/images/empty.png"
            alt="Placeholder"
            className="w-58 h-48 mb-4"
          />
          <p className="text-2xl font-bold mb-2 mt-6">Nothing's in here</p>
          <p className="text-gray-500 text-lg mb-6">
            You don't have any planned appointments, yet.
          </p>
        </div>
      )}
      <CustomButton
        buttonText={"Book Appointment"}
        onClick={() => {
          router.push("/booking");
        }}
      />
      </div>
  );
}
