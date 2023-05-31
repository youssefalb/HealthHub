import { useSession } from "next-auth/react";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { getDoctors, getLabSupervisors, getLabTechnicians, getReceptionists } from "../lib/manageUsers";
import { Role } from "@prisma/client";
import { ToastContainer } from "react-toastify";

export default function PersonnelList() {
    const { data: session } = useSession(); // it's not fired everytime, (only once), but I need to declare it to be able to access it
    const [isLoading, setIsLoading] = useState(true);
    const [labSupervisors, setLabSupervisors] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [labAssistants, setLabAssistants] = useState([]);
    const [receptionists, setReceptionists] = useState([]);

    const role = session?.user?.role;

    const fetchData = async () => {
        const fetchedLabAssistants = await getLabTechnicians();
        const fetchedDoctors = await getDoctors();
        const fetchedLabSupervisors = await getLabSupervisors();
        const fetchedReceptionists = await getReceptionists();
        setLabAssistants(fetchedLabAssistants.data);
        setDoctors(fetchedDoctors.data);
        setLabSupervisors(fetchedLabSupervisors.data);
        setReceptionists(fetchedReceptionists.data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (session) {
            fetchData();
        }
        // else loading state. show loading state
    }, [session, doctors, labAssistants, labSupervisors, receptionists]);


    // ToDo: loading component
    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="flex flex-col-reverse gap-4">
            <ToastContainer />
            <div>
            <h2 className="text-2xl font-bold mb-4">Lab Assistants</h2>
            {labAssistants.length ? (
                <div>
                    {labAssistants.map((assistant) => (
                        <UserCard
                            id={assistant.id}
                            nationalID={assistant.user.nationalId}
                            name={assistant.user.firstName}
                            surname={assistant.user.lastName}
                            role={Role.LAB_ASSISTANT}
                            isActive={assistant.user.isActive}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="/images/empty.png"
                        alt="Placeholder"
                        className="w-58 h-48 mb-4"
                    />
                    <p className="text-2xl font-bold mb-2 mt-6">No Lab Assistants</p>
                    <p className="text-gray-500 text-lg mb-6">
                        There are no lab assistants at the moment.
                    </p>
                </div>
            )}
            <div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Receptionists</h2>
            {receptionists.length ? (
                <div>
                    {receptionists.map((receptionist) => (
                        <UserCard
                            id={receptionist.id}
                            nationalID={receptionist.user.nationalId}
                            name={receptionist.user.firstName}
                            surname={receptionist.user.lastName}
                            role={Role.RECEPTIONIST}
                            isActive={receptionist.user.isActive}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="/images/empty.png"
                        alt="Placeholder"
                        className="w-58 h-48 mb-4"
                    />
                    <p className="text-2xl font-bold mb-2 mt-6">No Receptionists</p>
                    <p className="text-gray-500 text-lg mb-6">
                        There are no receptionists at the moment.
                    </p>
                </div>
            )}
            </div>
            <div>
            <h2 className="text-2xl font-bold mb-4">Lab Supervisors</h2>
            {labSupervisors.length ? (
                <div>
                    {labSupervisors.map((supervisor) => (
                        <UserCard
                            id={supervisor.id}
                            nationalID={supervisor.user.nationalId}
                            name={supervisor.user.firstName}
                            surname={supervisor.user.lastName}
                            role={Role.LAB_SUPERVISOR}
                            isActive={supervisor.user.isActive}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="/images/empty.png"
                        alt="Placeholder"
                        className="w-58 h-48 mb-4"
                    />
                    <p className="text-2xl font-bold mb-2 mt-6">No Lab Supervisors</p>
                    <p className="text-gray-500 text-lg mb-6">
                        There are no Lab Supervisors at the moment.
                    </p>
                </div>
            )}
            </div>





        </div>
    );
}
