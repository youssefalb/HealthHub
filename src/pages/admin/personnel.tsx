//here list of personnell and button to deactivate them

import PersonnelList from "@/components/PersonnelList";


export default function patientsPage() {
    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">All Personnel</h1>
            <PersonnelList />
        </div>
    )
}
