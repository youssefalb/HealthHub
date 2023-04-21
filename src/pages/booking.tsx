//here is a form for creating a visit
/*
    it needs : 
    modular form components : text - email - phone - name - checkbox for insurance - select for speciality and doctors - date / time picker 

    endpoints : 
        retrieve available specialities
        retrieve available doctors for a speciality
        retrieve available time slots for a doctor
        create a visit
*/

export default function bookVisit() {
  return (
    <div className="mx-auto max-w-screen-lg my-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Book a new Appointments</h1>
    </div>
  );
}
