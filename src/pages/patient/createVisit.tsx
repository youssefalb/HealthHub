
//here for refrence only

// import CustomButton from '@/components/CustomButton';
// import CustomTextInput from '@/components/CustomTextInput';
// import { useState } from 'react';


// //this was created just for testing purposes and will be redesigned later to meet the purpose of the project

// export default function CreateVisit() {
//   const [description, setDescription] = useState('');
//   const [diagnosis, setDiagnosis] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = { patientId: 1, doctorId: 7, description, diagnosis };
//     const res = await fetch(`/api/patient/createVisit`, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" }
//     })

//     const results = await res.json();
//     console.log(data);
//   };

//   return (
//     <div className="flex justify-center h-screen">
//       <form onSubmit={handleSubmit}>
//         <div className='grid-cols-2 gap flex flew'>
//           <CustomTextInput type='text' name='description' placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
//           <CustomTextInput type='text' name='diagnosis' placeholder='Diagnosis' onChange={(e) => setDiagnosis(e.target.value)} />
//         </div>
//         <div className="col-span-2 flex justify-center">
//           <CustomButton buttonText="Submit" onClick={handleSubmit} />
//         </div>
//       </form>
//     </div>
//   );
// }