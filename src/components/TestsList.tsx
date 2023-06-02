import { useSession } from "next-auth/react";
import TestCard from "./TestCard";
import { useEffect, useState } from "react";
import {getOwnTests, getTechOrSupervisorTests} from "@/lib/tests";
import { Role } from "@prisma/client";
import Link from "next/link";

//this page works for all 3 roles that need to view visits (patient, doctor, recept. )
export default function TestsList({techFetchAll = false}) {
  const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it
  const [isLoading, setIsLoading] = useState(true);
  const [tests, setTests] = useState([]);

  const role = session?.user?.role;

  const fetchData = async () => {
    try {
        let response;
        if(techFetchAll || role == Role.PATIENT || role == Role.DOCTOR)
          response = await getOwnTests(role);
        else
          response = await getTechOrSupervisorTests(role);

      setTests(response["data"]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tests:", error);
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
      {tests?.length ? (
        tests.map((test) => (
        <Link key={test.testId} href={`/tests/${test.testId}`}>
          <TestCard
            key={test.testId}
            test={test}
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
            You don't have any planned tests, yet.
          </p>
        </div>
      )}
      </div>
  );
}
