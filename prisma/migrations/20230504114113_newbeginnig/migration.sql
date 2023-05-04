-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'DOCTOR', 'LAB_SUPERVISOR', 'LAB_ASSISTANT', 'RECEPTIONIST', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REGISTERED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ExaminationStatus" AS ENUM ('COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LaboratoryTestStatus" AS ENUM ('ORDERED', 'COMPLETED', 'CANCELLED', 'APPROVED', 'REJECTED', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(32),
    "last_name" VARCHAR(32),
    "image" TEXT,
    "sex" VARCHAR(32),
    "email" VARCHAR(64),
    "password" TEXT,
    "email_verified" TIMESTAMP(3),
    "national_id" VARCHAR(11),
    "role" "Role" NOT NULL DEFAULT 'PATIENT',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "doctors" (
    "employee_id" TEXT NOT NULL,
    "employment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "receptionists" (
    "emplyee_id" TEXT NOT NULL,
    "employment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receptionists_pkey" PRIMARY KEY ("emplyee_id")
);

-- CreateTable
CREATE TABLE "lab_supervisors" (
    "emplyee_id" TEXT NOT NULL,
    "employment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lab_supervisors_pkey" PRIMARY KEY ("emplyee_id")
);

-- CreateTable
CREATE TABLE "lab_assistants" (
    "emplyee_id" TEXT NOT NULL,
    "employment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lab_assistants_pkey" PRIMARY KEY ("emplyee_id")
);

-- CreateTable
CREATE TABLE "patients" (
    "patient_id" TEXT NOT NULL,
    "insurance_id" TEXT,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "visits" (
    "visit_id" TEXT NOT NULL,
    "description" TEXT,
    "diagnosis" TEXT,
    "status" "Status" NOT NULL DEFAULT 'REGISTERED',
    "date" TIMESTAMP(3) NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_realized" TIMESTAMP(3),
    "doctor_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "receptionist_id" TEXT,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("visit_id")
);

-- CreateTable
CREATE TABLE "physic_examinations" (
    "physicalExamId" TEXT NOT NULL,
    "dictionary_code" INTEGER NOT NULL,
    "visit_id" TEXT NOT NULL,
    "status" "ExaminationStatus" NOT NULL DEFAULT 'COMPLETED',

    CONSTRAINT "physic_examinations_pkey" PRIMARY KEY ("physicalExamId")
);

-- CreateTable
CREATE TABLE "laboratory_examinations" (
    "test_id" TEXT NOT NULL,
    "doctor_note" TEXT,
    "lab_technician_note" TEXT,
    "supervisor_note" TEXT,
    "status" "LaboratoryTestStatus" NOT NULL DEFAULT 'ORDERED',
    "date_of_execution_xor_cancelling" TIMESTAMP(3),
    "date_of_approval_xor_rejection" TIMESTAMP(3),
    "dictionary_code" INTEGER NOT NULL,
    "lab_assistant_id" TEXT,
    "lab_supervisor_id" TEXT,
    "visit_id" TEXT,

    CONSTRAINT "laboratory_examinations_pkey" PRIMARY KEY ("test_id")
);

-- CreateTable
CREATE TABLE "examination_dictionaries" (
    "code" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "examination_dictionaries_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_national_id_key" ON "users"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "patients_insurance_id_key" ON "patients"("insurance_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receptionists" ADD CONSTRAINT "receptionists_emplyee_id_fkey" FOREIGN KEY ("emplyee_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_supervisors" ADD CONSTRAINT "lab_supervisors_emplyee_id_fkey" FOREIGN KEY ("emplyee_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_assistants" ADD CONSTRAINT "lab_assistants_emplyee_id_fkey" FOREIGN KEY ("emplyee_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_receptionist_id_fkey" FOREIGN KEY ("receptionist_id") REFERENCES "receptionists"("emplyee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physic_examinations" ADD CONSTRAINT "physic_examinations_dictionary_code_fkey" FOREIGN KEY ("dictionary_code") REFERENCES "examination_dictionaries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physic_examinations" ADD CONSTRAINT "physic_examinations_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "visits"("visit_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_examinations" ADD CONSTRAINT "laboratory_examinations_dictionary_code_fkey" FOREIGN KEY ("dictionary_code") REFERENCES "examination_dictionaries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_examinations" ADD CONSTRAINT "laboratory_examinations_lab_assistant_id_fkey" FOREIGN KEY ("lab_assistant_id") REFERENCES "lab_assistants"("emplyee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_examinations" ADD CONSTRAINT "laboratory_examinations_lab_supervisor_id_fkey" FOREIGN KEY ("lab_supervisor_id") REFERENCES "lab_supervisors"("emplyee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_examinations" ADD CONSTRAINT "laboratory_examinations_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "visits"("visit_id") ON DELETE SET NULL ON UPDATE CASCADE;
