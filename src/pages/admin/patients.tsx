// here is the list of patients and a button to ban them 

import PatientsList from "@/components/PatientsList";


export default function patientsPage() {
    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">All Patients</h1>
            <PatientsList />
        </div>
    )
}