import DoctorsAppointmentCard from "@/components/CustomComponents/DoctorsAppointmentCard";
//here the Doctor can see his past appointments and can change status of it

export default function docAppointmentsPage() {
    const appointments = [
        {
          id: 1,
          time: 'April 20,, 21:54',
          patient: 'Andrii Bobchuk',
          tag: 'inProgress',
        },
        {
            id: 2,
            time: 'April 20, 21:54',
            patient: 'Andrii Bobchuk',
            tag: 'canceled',
          },
          {
            id: 3,
            time: 'April 20, 21:54',
            patient: 'Andrii Bobchuk',
            tag: 'scheduled',
          },
      ];

      return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
         <h1 className="text-3xl font-bold mb-6">Upcoming Appointments</h1>
         <AppointmentsList appointments={appointments} />
        </div>
    )
}

function AppointmentsList({ appointments }) {
    if (appointments.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/empty.png" alt="Placeholder" className="w-58 h-48 mb-4" />
          <p className="text-2xl font-bold mb-2 mt-6">Nothing's in here</p>
          <p className="text-gray-500 text-lg mb-6">You don’t have appointments, probably you're a bad doctor.</p>
        </div>
      );
    }
  
    return (
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <DoctorsAppointmentCard key={appointment.id} {...appointment} />
        ))}
      </div>
    );
  }