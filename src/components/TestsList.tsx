import { useSession } from "next-auth/react";
import TestCard from "./TestCard";
import { useEffect, useState } from "react";
import { getOwnTests, getPatientTests, getTechOrSupervisorTests } from "@/lib/tests";
import { Role } from "@prisma/client";
import EmptyStateMessage from "./EmptyStateMessage";
import Link from "next/link";

//this page works for all 3 roles that need to view visits (patient, doctor, recept. )
export default function TestsList({ patientId = null, techFetchAll = false }) {
    const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it
    const [isLoading, setIsLoading] = useState(true);
    const [tests, setTests] = useState([]);

    const role = session?.user?.role;

    const fetchData = async () => {
        try {
            let response;
            if (patientId != null)
                response = await getPatientTests(patientId);
            else {
                if (techFetchAll || role == Role.PATIENT || role == Role.DOCTOR)
                    response = await getOwnTests(role);
                else
                    response = await getTechOrSupervisorTests(role);
            }
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
        // TODO(asser): add hyperling or redirect to one test details
        <div className="flex flex-col-reverse gap-4">
            {tests?.length ? (
                tests.map((test) => (
                    <Link key={test.testId} href={`/tests/${test.testId}`} >
                        <TestCard
                            // ToDo: filter visits by status and display scheduled first, then completed, then cancelled 
                            key={test.testId}
                            test={test}
                            role={role}
                        />
                    </Link>
                ))
            ) : (
                <EmptyStateMessage
                    title="No Tests"
                    description="You don't have any planned tests, yet."
                />
            )}
        </div>
    );
}
