const specialities = [
  "GENERAL_PRACTICE",
  "INTERNAL_MEDICINE",
  "PEDIATRICS",
  "OBSTETRICS_AND_GYNECOLOGY",
  "CARDIOLOGY",
  "DERMATOLOGY",
  "ORTHOPEDICS",
  "GASTROENTEROLOGY",
  "NEUROLOGY",
  "PSYCHIATRY",
  "UROLOGY",
  "OPHTHALMOLOGY",
  "ENDOCRINOLOGY",
  "ONCOLOGY",
  "RHEUMATOLOGY",
  "ALLERGY_AND_IMMUNOLOGY"
];

const doctorsPerSpeciality = 2; 

const doctors = [];

let doctorId = 1;

specialities.forEach((speciality) => {
  for (let i = 0; i < doctorsPerSpeciality; i++) {
    const doctor = {
      firstName: `Doctor ${doctorId}`,
      lastName: `Lastname ${doctorId}`,
      sex: "M", // Assuming all doctors are male for simplicity
      id: `D${doctorId}`,
      nationalId: `0711030337${doctorId}`,
      email: `doctor${doctorId}@gmail.com`,
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: 'await hashPassword("password123")',
      role: "DOCTOR",
      doctor: { create: { "speciality" :  speciality} }
    };

    doctors.push(doctor);
    doctorId++;
  }
});

console.log(doctors);