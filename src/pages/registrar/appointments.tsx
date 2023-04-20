import CustomButton from "@/components/CustomButton";
import AppointmentCard from "@/components/AppointmentCard";

//here the Registrar can see all past and upcoming appointments and can change details and add more


export default function regAppointmentsPage() {
    const appointments = [
        {
          id: 1,
          date: 'April 20, 2023, 21:54',
          doctorName: 'Patient Andrii Bobchuk',
          specialization: 'Dr. Jane Smith',
        },
        {
            id: 1,
            date: 'April 20, 2023, 21:54',
            doctorName: 'Patient Andrii Bobchuk',
            specialization: 'Dr. Jane Smith',
          },
          {
            id: 1,
            date: 'April 20, 2023, 21:54',
            doctorName: 'Patient Andrii Bobchuk',
            specialization: 'Dr. Jane Smith',
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
          <p className="text-gray-500 text-lg mb-6">No one has any appointments, yet.</p>
          <CustomButton buttonText={"Book Appointment"} onClick={() => {}} /> 
        </div>
      );
    }
  
    return (
      <div className="space-y-4">
        <CustomButton buttonText={"Book Appointment"} onClick={() => {}} />
        <p className="m-6"></p>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} {...appointment} />
        ))}
      </div>
    );
  }