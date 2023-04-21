//here the patient, doctor and recept. can see  appointments and make a new reservation
import AppointmentList from "@/components/AppointmentList";

export default function visitsPage() {
    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Upcoming Appointments</h1>
            <AppointmentList />
        </div>
    );
}
