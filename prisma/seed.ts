import { PrismaClient, Prisma } from "@prisma/client";
import { hashPassword } from "../src/lib/hashPassword";
const prisma = new PrismaClient();

async function seed() {
  const examinationDictionarySeedData: Prisma.ExaminationDictionaryCreateInput[] =
    [
      {
        type: "Physical",
        description: "Physical Examination",
      },
      {
        type: "Laboratory",
        description: "Laboratory Examination",
      },
      {
        type: "Radiology",
        description: "Radiology Examination",
      },
      {
        type: "Cardiology",
        description: "Cardiology Examination",
      },
      {
        type: "Dermatology",
        description: "Dermatology Examination",
      },
      {
        type: "Ophthalmology",
        description: "Ophthalmology Examination",
      },
      {
        type: "Gastroenterology",
        description: "Gastroenterology Examination",
      },
      {
        type: "Neurology",
        description: "Neurology Examination",
      },
      {
        type: "Endocrinology",
        description: "Endocrinology Examination",
      },
      {
        type: "Orthopedics",
        description: "Orthopedics Examination",
      },
      // Add more seed data as needed
    ];
  const userData: Prisma.UserCreateInput[] = [
    {
      firstName: "Viktor",
      lastName: "Didyk",
      nationalId: "USA",
      email: "vity5.diduk@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      patient: { create: { insuranceId: "123456789" } },
    },
    {
      firstName: "Viktor",
      lastName: "Didyk",
      nationalId: "UA",
      email: "vity2.diduk@gmail.com",
      password: await hashPassword("password123"),

      patient: { create: { insuranceId: "123458" } },
    },
    {
      firstName: "Viktor",
      lastName: "Didyk",
      nationalId: "MA",
      email: "vity3.diduk@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),

      patient: { create: { insuranceId: "987456" } },
    },
    {
      firstName: "Andrii",
      lastName: "Bobchuk",
      sex: "yes",
      nationalId: "Poland",
      email: "andrii.bobchuk@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "RECEPTIONIST",
      receptionist: { create: {} },
    },
    {
      firstName: "Mike",
      lastName: "Smaluch",
      sex: "sometimes",
      nationalId: "Belarussia",
      email: "mike.smaluch@gmailc.om",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: {} },
    },
    {
      firstName: "Asser",
      lastName: "Elfeki",
      sex: "polsl",
      nationalId: "Netherland",
      email: "ass.elfeki@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_ASSISTANT",
      labAssistant: { create: {} },
    },
    {
      firstName: "Youssef",
      lastName: "Al Bali",
      sex: "always",
      nationalId: "Morocco",
      email: "ydm@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: {} },
    },
  ];
  const visitData: Prisma.VisitCreateInput[] = [
    {
      description: "First visit",
      diagnosis: "Common cold",
      date: "2023-03-29T16:30:00.000Z",
      doctor: { connect: { employeeId: 7 } },
      patient: { connect: { patientId: 1 } },
      receptionist: { connect: { employeeId: 4 } },
    },
    {
      description: "second visit",
      diagnosis: "Common cold",
      date: "2024-01-29T16:30:00.000Z",
      doctor: { connect: { employeeId: 5 } },
      patient: { connect: { patientId: 1 } },
      receptionist: { connect: { employeeId: 4 } },
    },
    {
      description: "Follow-up visit",
      diagnosis: "Sprained ankle",
      date: "2023-03-29T16:30:00.000Z",
      doctor: { connect: { employeeId: 7 } },
      patient: { connect: { patientId: 2 } },
      receptionist: { connect: { employeeId: 4 } },
    },
    {
      description: "Yearly check-up",
      diagnosis: "Healthy",
      date: "2023-03-29T16:30:00.000Z",
      doctor: { connect: { employeeId: 7 } },
      patient: { connect: { patientId: 3 } },
      receptionist: { connect: { employeeId: 4 } },
    },
  ];

  const labExaminationData: Prisma.LaboratoryExaminationCreateInput[] = [
    {
      examinationDictionary: {
        create: { type: "Covid test", description: "Covid test" },
      },
      doctorNote: "Patient is anemic",
      status: "ORDERED",
      supervisorNote: "",
      dateOfApprovalXorRejection: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: 1 } },
      labAssistant: { connect: { employeeId: 6 } },
    },
    {
      examinationDictionary: {
        create: { type: "Heart test", description: "Heart issues" },
      },
      doctorNote: "Patient have some problems with his heart",
      status: "ORDERED",
      supervisorNote: "",
      dateOfApprovalXorRejection: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: 2 } },
      labAssistant: { connect: { employeeId: 6 } },
    },
  ];
  const pyshicalExaminationData: Prisma.PhysicalExaminationCreateInput[] = [
    {
      examinationDictionary: {
        create: { type: "Covid test", description: "Covid test" },
      },
      visit: { connect: { visitId: 1 } },
    },

    {
      examinationDictionary: {
        create: { type: "Heart", description: "Heart problems" },
      },
      visit: { connect: { visitId: 2 } },
    },
  ];
  for (const user of userData) {
    const u = await prisma.user.create({ data: user });
    console.log(`Created user with id: ${u.id}`);
  }

  for (const visit of visitData) {
    const v = await prisma.visit.create({ data: visit });
    console.log(`Created visit with id: ${v.visit_id}`);
  }
  for (const labExamination of labExaminationData) {
    const l = await prisma.laboratoryExamination.create({
      data: labExamination,
    });
    console.log(`Created labExamination with id: ${l.laboratory_exam_id}`);
  }
  for (const physicalExamination of pyshicalExaminationData) {
    const p = await prisma.physicalExamination.create({
      data: physicalExamination,
    });
    console.log(`Created physicalExamination with id: ${p.physical_exam_id}`);
  }
  for (const examinationDictionary of examinationDictionarySeedData) {
    const e = await prisma.examinationDictionary.create({
      data: examinationDictionary,
    });
    console.log(`Created examinationDictionary with id: ${e.code}`);
  }
}

async function main() {
  console.log(`Start seeding ...`);
  await seed();
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
