import { PrismaClient, Prisma } from '@prisma/client'
import { hashPassword } from '../src/lib/hashPassword'
const prisma = new PrismaClient()


async function seed() {

  const examinationDictionarySeedData: Prisma.ExaminationDictionaryCreateInput[] = [
  {
    type: 'Physical',
    description: 'Physical Examination',
  },
  {
    type: 'Laboratory',
    description: 'Laboratory Examination',
  },
  {
    type: 'Radiology',
    description: 'Radiology Examination',
  },
  {
    type: 'Cardiology',
    description: 'Cardiology Examination',
  },
  {
    type: 'Dermatology',
    description: 'Dermatology Examination',
  },
  {
    type: 'Ophthalmology',
    description: 'Ophthalmology Examination',
  },
  {
    type: 'Gastroenterology',
    description: 'Gastroenterology Examination',
  },
  {
    type: 'Neurology',
    description: 'Neurology Examination',
  },
  {
    type: 'Endocrinology',
    description: 'Endocrinology Examination',
  },
  {
    type: 'Orthopedics',
    description: 'Orthopedics Examination',
  },
  // Add more seed data as needed
];
  const userData: Prisma.UserCreateInput[] = [
    {
      fname: "Viktor",
      lname: "Didyk",
      nationalID: "USA",
      email: "vity5.diduk@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      patient: { create: { insurance_id: "123456789" } }
    },
    {
      fname: "Viktor",
      lname: "Didyk",
      nationalID: "UA",
      email: "vity5.diduk@gmail.co",
      password: await hashPassword("password123"),

      patient: { create: { insurance_id: "123458" } }
    },
    {
      fname: "Viktor",
      lname: "Didyk",
      nationalID: "MA",
      email: "ity5.diduk@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),

      patient: { create: { insurance_id: "987456" } }
    },
    {
      fname: "Andrii",
      lname: "Bobchuk",
      sex: "yes",
      nationalID: "Poland",
      email: "v.diduk@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "RECEPTIONIST",
      receptionist: { create: {} }
    },
    {
      fname: "Mike",
      lname: "Smaluch",
      sex: "sometimes",
      nationalID: "Belarussia",
      email: "vit.diduk@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: {} }
    },
    {
      fname: "Asser",
      lname: "Elfeki",
      sex: "polsl",
      nationalID: "Netherland",
      email: "v.iduk@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_ASSISTANT",
      lab_assistant: { create: {} }
    },
    {
      fname: "Youssef",
      lname: "Al Bali",
      sex: "always",
      nationalID: "Morocco",
      email: "vity5.dik@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: {} }
    }
  ]
  const visitData: Prisma.VisitCreateInput[] = [
    {
      description: "First visit",
      diagnosis: "Common cold",
      doctor: { connect: { employee_id: 7 } },
      patient: { connect: { patient_id: 1 } },
      receptionist: { connect: { employee_id: 4 } },
    },
    {
      description: "Follow-up visit",
      diagnosis: "Sprained ankle",
      doctor: { connect: { employee_id: 7 } },
      patient: { connect: { patient_id: 2 } },
      receptionist: { connect: { employee_id: 4 } },
    },
    {
      description: "Yearly check-up",
      diagnosis: "Healthy",
      doctor: { connect: { employee_id: 7 } },
      patient: { connect: { patient_id: 3 } },
      receptionist: { connect: { employee_id: 4 } },
    },
  ];

   const labExaminationData: Prisma.LaboratoryExaminationCreateInput[] = [
     {
      examinationDictionary: {create: {type:"Covid test", description: "Covid test"}},
      doctorNotice: "Patient is anemic",
       examinationStatus: "ORDERED",
       supervisorNotice: "",
       DateOfApprovalXorRejection: '2023-03-29T16:30:00.000Z',
       DateOfExecutionXorCancelling: '2023-03-29T16:30:00.000Z',
       visit: { connect: { visit_id: 1 } },
       lab_assistant: { connect: { employee_id: 6 } },
     },
    {
      examinationDictionary: {create: {type:"Heart test", description: "Heart issues"}},
      doctorNotice: "Patient have some problems with his heart",
       examinationStatus: "ORDERED",
       supervisorNotice: "",
       DateOfApprovalXorRejection: '2023-03-29T16:30:00.000Z',
       DateOfExecutionXorCancelling: '2023-03-29T16:30:00.000Z',
       visit: { connect: { visit_id: 2 } },
       lab_assistant: { connect: { employee_id: 6 } },
     }
   ]
const pyshicalExaminationData: Prisma.PhysicalExaminationCreateInput[] = [
  {
    examinationDictionary: {create: {type:"Covid test", description: "Covid test"}},
    visit: { connect: { visit_id: 1 } },
  },

  {
    examinationDictionary: {create: {type:"Heart", description: "Heart problems"}},
    visit: { connect: { visit_id: 2 } },
  },
]
  for (const user of userData) {
    const u = await prisma.user.create({ data: user })
    console.log(`Created user with id: ${u.id}`)
  }

  for (const visit of visitData) {
    const v = await prisma.visit.create({ data: visit })
    console.log(`Created visit with id: ${v.visit_id}`)
  }
  for (const labExamination of labExaminationData) {
    const l = await prisma.laboratoryExamination.create({ data: labExamination })
    console.log(`Created labExamination with id: ${l.laboratory_exam_id}`)
  }
  for (const physicalExamination of pyshicalExaminationData) {
    const p = await prisma.physicalExamination.create({ data: physicalExamination })
    console.log(`Created physicalExamination with id: ${p.physical_exam_id}`)
  }
  for (const examinationDictionary of examinationDictionarySeedData) {
    const e = await prisma.examinationDictionary.create({ data: examinationDictionary })
    console.log(`Created examinationDictionary with id: ${e.code}`)
  }
}




async function main() {
  console.log(`Start seeding ...`)
  await seed()
  console.log(`Seeding finished.`)

}



main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
