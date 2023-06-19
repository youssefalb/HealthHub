import { useEffect, useState } from 'react';
import AppointmentList from '@/components/AppointmentList';
import { getPatients } from '@/lib/manageVisits';
import { TextField, Autocomplete } from '@mui/material';
import EmptyStateMessage from '@/components/EmptyStateMessage';

export default function VisitsPage() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchValue, setSearchValue] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsData = await getPatients();
                const patients = patientsData['data'];
                setPatients(patients);
                setFilteredPatients(patients);
            } catch (error) {
                console.error('Failed to fetch patients:', error);
            }
        };
        fetchPatients();
    }, []);

    useEffect(() => {
        setFilteredPatients(patients);
    }, [patients]);

    useEffect(() => {
        if (!searchValue) {
            setFilteredPatients(patients);
            return;
        }
        const filtered = patients.filter((patient) => {
            const fullName = `${patient.user?.firstName || ''} ${patient.user?.lastName || ''}`;
            return (
                patient.patientId === searchValue.patientId ||
                fullName.toLowerCase().includes(String(searchValue).toLowerCase())
            );
        });
        setFilteredPatients(filtered);
    }, [searchValue]);

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Appointments</h1>
            <Autocomplete
                value={searchValue}
                onChange={(event, newValue) => { setSearchValue(newValue) }}
                options={patients}
                getOptionLabel={(patient) => `${patient.user?.firstName || ''} ${patient.user?.lastName || ''}`}
                renderInput={(params) => <TextField {...params} label="Search patient" />}
            />
            {filteredPatients.length === 1 && filteredPatients[0].visits?.length === 0 ? (
                <EmptyStateMessage
                    title="No Appointments"
                    description="There are no planned appointments for the selected patient."
                />
            ) : (
                filteredPatients.map((patient) => (
                    <div key={patient.patientId}>
                        <AppointmentList {...patient} />
                    </div>
                ))
            )}
        </div>
    );
}
