import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.PersonCreateInput[] = [
  {
    fname: "Viktor",
    lname: "Didyk",
    nationalID: "Kanada",
    patient: {create:{insurance_id: "123456789"}}
  },
  {
    fname: "Andrii",
    lname: "Bobchuk",
    sex:   "yes",
    nationalID: "Poland",
    clinicStaff: {create: {receptionist: {create:{}}}}
  },
  {
      fname: "Mike",
      lname: "Smaluch",
      sex: "sometimes",
      nationalID: "Belarussia",
      labStaff: {create: {labAssistant: {create:{}}}}
  },
  {
      fname: "Asser",
      lname: "Elfeki",
      sex: "polsl",
      nationalID: "Netherland",
      labStaff: {create: {labSupervisor: {create: {}}}}
  },
  {
      fname: "Youssef",
      lname: "Al Bali",
      sex: "always",
      nationalID: "Morocco",
      clinicStaff: {create: {doctor: {create: {}}}}
  }
  ]

const visitData: Prisma.VisitCreateInput[] = [
    {
    description: "19y old teenager came to hospital late night having ukrainian passport and egyptian with ukrainian as help",
    diagnosis : "The god knows",
    status: "COMPLETED",
    doctor: {connect: {person: {connect: {fname: "Youssef"}}}
    }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.person.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
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
