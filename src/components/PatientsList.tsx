import { useSession } from "next-auth/react";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { getPatients } from "../lib/manageUsers";
import { Role } from "@prisma/client";
import { ToastContainer } from "react-toastify";
import EmptyStateMessage from "./EmptyStateMessage";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PatientsList() {
  const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const fetchedPatients = await getPatients();
    setPatients(fetchedPatients.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
    // else loading state. show loading state
  }, [session]);

  return (
    <div className="flex flex-col-reverse gap-4">
      <ToastContainer />
      {patients?.length ? (
        patients.map((patient) => (
          <Link key={patient.patientId} href={`user-settings/${patient.patientId}`} >
            <UserCard
              id={patient.patientId}
              name={patient.user.firstName}
              surname={patient.user.lastName}
              nationalID={patient.user.nationalId}
              role={Role.PATIENT}
              isActive={patient.user.isActive}
            />
          </Link>
        ))
      ) : (
        <EmptyStateMessage
          title="No Patients"
          description="There are no patients for now."
        />
      )}

    </div>
  );
}
