/*
  Warnings:

  - The values [GYNECOLOGY,OTOLARYNGOLOGY,PULMONOLOGY,ANESTHESIOLOGY,PATHOLOGY,RADIOLOGY,DENTISTRY,DIETETICS,BIOCHEMISTRY] on the enum `Specializations` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `examination_dictionaries` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Specializations_new" AS ENUM ('GENERAL_PRACTICE', 'INTERNAL_MEDICINE', 'PEDIATRICS', 'OBSTETRICS_AND_GYNECOLOGY', 'CARDIOLOGY', 'DERMATOLOGY', 'ORTHOPEDICS', 'GASTROENTEROLOGY', 'NEUROLOGY', 'PSYCHIATRY', 'UROLOGY', 'OPHTHALMOLOGY', 'ENDOCRINOLOGY', 'ONCOLOGY', 'RHEUMATOLOGY', 'ALLERGY_AND_IMMUNOLOGY', 'SURGERY');
ALTER TABLE "doctors" ALTER COLUMN "speciality" DROP DEFAULT;
ALTER TABLE "doctors" ALTER COLUMN "speciality" TYPE "Specializations_new" USING ("speciality"::text::"Specializations_new");
ALTER TYPE "Specializations" RENAME TO "Specializations_old";
ALTER TYPE "Specializations_new" RENAME TO "Specializations";
DROP TYPE "Specializations_old";
ALTER TABLE "doctors" ALTER COLUMN "speciality" SET DEFAULT 'SURGERY';
COMMIT;

-- DropForeignKey
ALTER TABLE "laboratory_examinations" DROP CONSTRAINT "laboratory_examinations_dictionary_code_fkey";

-- DropForeignKey
ALTER TABLE "physic_examinations" DROP CONSTRAINT "physic_examinations_dictionary_code_fkey";

-- AlterTable
ALTER TABLE "examination_dictionaries" DROP CONSTRAINT "examination_dictionaries_pkey",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "code" DROP DEFAULT,
ALTER COLUMN "code" SET DATA TYPE TEXT,
ALTER COLUMN "type" SET DEFAULT '',
ADD CONSTRAINT "examination_dictionaries_pkey" PRIMARY KEY ("code");
DROP SEQUENCE "examination_dictionaries_code_seq";

-- AlterTable
ALTER TABLE "laboratory_examinations" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "result" TEXT,
ALTER COLUMN "dictionary_code" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "physic_examinations" ADD COLUMN     "doctor_note" TEXT,
ALTER COLUMN "dictionary_code" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "national_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "visits" ADD COLUMN     "patient_note" TEXT;

-- AddForeignKey
ALTER TABLE "physic_examinations" ADD CONSTRAINT "physic_examinations_dictionary_code_fkey" FOREIGN KEY ("dictionary_code") REFERENCES "examination_dictionaries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_examinations" ADD CONSTRAINT "laboratory_examinations_dictionary_code_fkey" FOREIGN KEY ("dictionary_code") REFERENCES "examination_dictionaries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
