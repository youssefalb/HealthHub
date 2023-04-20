import NextAuth from "next-auth/next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AppointmentCard from "./AppointmentCard";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";

export default function AppointmentsList() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      if (session) {
        if (session.user.role === "PATIENT") {
          const response = await fetch(
            `/api/patient/visits?id=${session.user.id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const results = await response.json();
          setAppointments(results);
        }
      }
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
          <AppointmentCard key={appointment.visit_id} {...appointment} />
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
          <CustomButton buttonText={"Book Appointment"} onClick={() => {}} />
        </div>
      )}
    </div>
  );
}
