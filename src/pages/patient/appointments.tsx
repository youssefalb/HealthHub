//here the patient can see his past appointments and make a new reservation

import { useSession } from "next-auth/react";
import AppointmentList from "@/components/AppointmentList";

export default function patientAppointmentsPage() {
  const { data: session } = useSession();
 

  if (session) {
    if (session.user.role == "PATIENT") {
      return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Upcoming Appointments</h1>
          <AppointmentList />
        </div>
      );
    }
  }
}
