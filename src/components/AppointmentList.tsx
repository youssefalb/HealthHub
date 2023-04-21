import { useSession } from "next-auth/react";
import AppointmentCard from "./AppointmentCard";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import { getVisits } from "@/lib/api";
import { Router, useRouter } from "next/router";

//this page works for all 3 roles that need to view visits (patient, doctor, recept. )
export default function AppointmentsList() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  const role = session?.user?.role;
  const fetchData = async () => {
    try {
      const response = await getVisits(session?.user?.role, session?.user?.id);
      const results = await response.json();
      setAppointments(results);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      {appointments.length ? (
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.visit_id}
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
