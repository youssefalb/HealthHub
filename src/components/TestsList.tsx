import { useSession, getSession } from "next-auth/react";
import TestCard from "./TestCard";
import { useEffect, useState } from "react";
import {getOwnTests} from "@/lib/tests";
import { useRouter } from "next/router";

//this page works for all 3 roles that need to view visits (patient, doctor, recept. )
export default function TestsList() {
  const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it
  const [isLoading, setIsLoading] = useState(true);
  const [tests, setTests] = useState([]);

  const role = session?.user?.role;
  const user_id = session?.user?.id;
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await getOwnTests(role);
      const results = await response.json();
      setTests(results["data"]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tests:", error);
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
      {tests?.length ? (
        tests.map((test) => (
          <TestCard
            // ToDo: filter visits by status and display scheduled first, then completed, then cancelled 
            key={test.testId}
            test={test}
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
            You don't have any planned tests, yet.
          </p>
        </div>
      )}
      </div>
  );
}
