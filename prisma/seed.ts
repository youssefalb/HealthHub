import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    fname: "Viktor",
    lname: "Didyk",
    nationalID: "USA",
    email: "vity5.diduk@gmail.com",
    password: "password123",
    patient: {create:{insurance_id: "123456789"}}
  },
  {
    fname: "Viktor",
    lname: "Didyk",
    nationalID: "UA",
    email: "vity5.diduk@gmail.co",
    password: "password123",

    patient: {create:{insurance_id: "123458"}}
  },
  {
    fname: "Viktor",
    lname: "Didyk",
    nationalID: "MA",
    email: "ity5.diduk@gmail.com",
    password: "password123",

    patient: {create:{insurance_id: "987456"}}
  },
  {
    fname: "Andrii",
    lname: "Bobchuk",
    sex:   "yes",
    nationalID: "Poland",
    email: "v.diduk@gmail.com",
    password: "password123",

    clinicStaff: {create: {receptionist: {create:{}}}}
  },
  {
    fname: "Mike",
    lname: "Smaluch",
    sex: "sometimes",
    nationalID: "Belarussia",
    email: "vit.diduk@gmail.com",
    password: "password123",

    labStaff: {create: {labAssistant: {create:{}}}}
  },
  {
    fname: "Asser",
    lname: "Elfeki",
    sex: "polsl",
    nationalID: "Netherland",
    email: "v.iduk@gmail.com",
    password: "password123",

    labStaff: {create: {labSupervisor: {create: {}}}}
  },
  {
    fname: "Youssef",
    lname: "Al Bali",
    sex: "always",
    nationalID: "Morocco",
    email: "vity5.dik@gmail.com",
    password: "password123",

    clinicStaff: {create: {doctor: {create: {}}}}
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
//  const labExaminationData: Prisma.LaboratoryExaminationCreateInput[] = [
//    {
//     examination: {create: {examinationDictionary: {create: {code: 548,type:"Covid test", description: "Covid test"}}}},
//     doctorNotice: "Patient is anemic",
//      examinationStatus: "ORDERED",
//      supervisorNotice: "",
//      DateOfApprovalXorRejection: '2023-03-29T16:30:00.000Z',
//      DateOfExecutionXorCancelling: '2023-03-29T16:30:00.000Z',
//      visit: { connect: { visit_id: 1 } },
//      lab_assistant: { connect: { employee_id: 5 } },
//    },
//  ]
//

  async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const v of visitData) {  
    const visit = await prisma.visit.create({
      data: v,
    })
    console.log(`Created visit with id: ${visit.visit_id}`)
  }
//  for (const l of labExaminationData) { 
//    const labExamination = await prisma.laboratoryExamination.create({
//      data: l,
//    })
//    console.log(`Created labExamination with id: ${labExamination.laboratory_exam_id}`)
//  }



  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
