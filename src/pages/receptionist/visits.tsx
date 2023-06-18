import { useEffect, useState } from 'react';
import AppointmentList from '@/components/AppointmentList';
import { getPatients } from '@/lib/manageVisits';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EmptyStateMessage from '@/components/EmptyStateMessage';

export default function VisitsPage() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchValue, setSearchValue] = useState('');

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
        console
        const filtered = patients.filter((patient) => {
            return patient.patientId === searchValue;
        });
        setFilteredPatients(filtered);
    }, [searchValue]);

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Appointments</h1>
            <FormControl fullWidth margin="normal">
                <InputLabel id="search-patient-label">Search patient</InputLabel>
                <Select
                    labelId="search-patient-label"
                    value={searchValue}
                    label="Search patient"
                    onChange={(e) => setSearchValue(e.target.value)}
                >
                    {patients.map((patient) => (
                        <MenuItem key={patient.patientId} value={patient.patientId}>
                            {`${patient.user.firstName} ${patient.user.lastName}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
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
