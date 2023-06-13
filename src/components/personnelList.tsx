import { useSession } from "next-auth/react";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { getPersonnel } from "../lib/manageUsers";
import EmptyStateMessage from "./EmptyStateMessage";
import Link from "next/link";
import { TextField } from "@mui/material";

export default function PersonnelList() {
    const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it
    const [isLoading, setIsLoading] = useState(true);
    const [personnel, setPersonnel] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    const fetchData = async () => {
        const fetchedpersonnel = await getPersonnel();
        setPersonnel(fetchedpersonnel.data);
        console.log(fetchedpersonnel.data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (session) {
            fetchData();
        }
        // else loading state. show loading state
    }, [session]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPersonnel = personnel.filter((patient) =>
        `${patient.firstName} ${patient.lastName} ${patient.nationalId} ${patient.role}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // ToDo: loading component
    if (isLoading) return <p>Loading...</p>;
    return (
        <div>
            <TextField
                type="text"
                placeholder="Search Personnel..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex flex-col-reverse gap-4">
                    {filteredPersonnel?.length ? (
                        filteredPersonnel.map((person) => (
                            <Link key={person.patientId} href={`user-settings/${person.id}`} >
                                <UserCard
                                    id={person.id}
                                    name={person.firstName}
                                    surname={person.lastName}
                                    nationalID={person.nationalId}
                                    role={person.role}
                                    isActive={person.isActive}
                                />
                            </Link>
                        ))
                    ) : (
                        <EmptyStateMessage
                            title="No Personnel"
                            description="There are no Personnel for now."
                        />
                    )}

            </div>
        </div >
    );
}
