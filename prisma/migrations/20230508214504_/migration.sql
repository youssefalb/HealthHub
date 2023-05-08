/*
  Warnings:

  - You are about to drop the column `Speciality` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "Speciality",
ADD COLUMN     "speciality" "Specializations" NOT NULL DEFAULT 'SURGERY';
