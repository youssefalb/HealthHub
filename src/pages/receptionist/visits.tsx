import { useEffect, useState } from 'react';
import AppointmentList from '@/components/AppointmentList';
import { getPatients } from '@/lib/manageVisits';

export default function VisitsPage() {
    const [patientIds, setPatientIds] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patients = await getPatients();
                const ids = patients["data"].map((patient) => patient.patientId);
                console.log("ids", ids)
                setPatientIds(ids);
            } catch (error) {
                console.error('Failed to fetch patients:', error);
            }
        };

        fetchPatients();
    }, []);

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Appointments</h1>
            {patientIds.map((patientId) => (
                <AppointmentList key={patientId} patientId={patientId} />
            ))}
        </div>
    );
}
