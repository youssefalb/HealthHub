import { PrismaClient, Prisma } from "@prisma/client";
import { hashPassword } from "../src/lib/hashPassword";
const prisma = new PrismaClient();

async function seed() {
  const examinationDictionarySeedData: Prisma.ExaminationDictionaryCreateInput[] = [
    {
      name: "Covid-19",
      type: "lab",
      description: ""
    }
  ]
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
