import { useSession } from "next-auth/react";
import AppointmentCard from "./AppointmentCard";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import { getOwnVisits } from "@/lib/visits";
import { useRouter } from "next/router";
import Link from "next/link";

//this page works for all 3 roles that need to view visits (patient, doctor, recept. )
export default function AppointmentsList() {
  const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const role = session?.user?.role;
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await getOwnVisits(role);
      const results = await response.json();
      setAppointments(results["data"].reverse());
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };       

  useEffect(() => {
    if (session) {
      fetchData();
    }
    //else loading state. show loading state
  }, [session]);

  // ToDo : loading component
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col-reverse gap-4">
      {appointments?.length ? (
        appointments.map((appointment) => (
        <Link key={appointment.visitId} href={`/visits/${appointment.visitId}`}>
          <AppointmentCard
            key={appointment.visitId}
            appointment={appointment}
            role={role}
          />
          </Link>
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
