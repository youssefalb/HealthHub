import { useSession } from "next-auth/react";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { getPatients } from "../lib/manageUsers";
import { Role } from "@prisma/client";

// This page works for all 3 roles that need to view visits (patient, doctor, recept.)
export default function PatientsList({ techFetchAll = false }) {
  const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it
  const [isLoading, setIsLoading] = useState(true);

  const role = session?.user?.role;

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

  const [patients, setPatients] = useState([]);

  // ToDo: loading component
  if (isLoading) return <p>Loading...</p>;
  return (
    // TODO: add hyperlink or redirect to one test details
    <div className="flex flex-col-reverse gap-4">
      {patients?.length ? (
        patients.map((patient) => (
          <UserCard
            id={patient.patientId}
            name={patient.user.firstName}
            surname={patient.user.lastName}
            nationalID={patient.user.nationalId}
            role={Role.PATIENT}
            isActive={patient.user.isActive}
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
            There are no users for now
          </p>
        </div>
      )}
      
    </div>
  );
}
