-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REGISTERED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ExaminationStatus" AS ENUM ('ORDERED', 'COMPLETED', 'CANCELLED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "national_id" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabStaff" (
    "lab_employee_id" INTEGER NOT NULL,

    CONSTRAINT "LabStaff_pkey" PRIMARY KEY ("lab_employee_id")
);

-- CreateTable
CREATE TABLE "ClinicStaff" (
    "clinic_employee_id" INTEGER NOT NULL,

    CONSTRAINT "ClinicStaff_pkey" PRIMARY KEY ("clinic_employee_id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Receptionist" (
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "Receptionist_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "LabSupervisor" (
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "LabSupervisor_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "LabAssistant" (
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "LabAssistant_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "patient_id" INTEGER NOT NULL,
    "insurance_id" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "visit_id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'REGISTERED',
    "doctor_id" INTEGER NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "receptionist_id" INTEGER NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("visit_id")
);

-- CreateTable
CREATE TABLE "Examination" (
    "examination_id" SERIAL NOT NULL,
    "Result" TEXT NOT NULL,
    "exam_code" INTEGER NOT NULL,

    CONSTRAINT "Examination_pkey" PRIMARY KEY ("examination_id")
);

-- CreateTable
CREATE TABLE "PhysicalExamination" (
    "physical_exam_id" INTEGER NOT NULL,
    "visit_id" INTEGER NOT NULL,

    CONSTRAINT "PhysicalExamination_pkey" PRIMARY KEY ("physical_exam_id")
);

-- CreateTable
CREATE TABLE "ExaminationDictionary" (
    "code" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ExaminationDictionary_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "LaboratoryExamination" (
    "laboratory_exam_id" INTEGER NOT NULL,
    "doctorNotice" TEXT NOT NULL,
    "examinationStatus" "ExaminationStatus" NOT NULL,
    "supervisorNotice" TEXT NOT NULL,
    "DateOfApprovalXorRejection" TIMESTAMP(3) NOT NULL,
    "DateOfExecutionXorCancelling" TIMESTAMP(3) NOT NULL,
    "visit_id" INTEGER NOT NULL,
    "lab_assistant_id" INTEGER NOT NULL,

    CONSTRAINT "LaboratoryExamination_pkey" PRIMARY KEY ("laboratory_exam_id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_national_id_key" ON "Person"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_insurance_id_key" ON "Patient"("insurance_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "LabStaff" ADD CONSTRAINT "LabStaff_lab_employee_id_fkey" FOREIGN KEY ("lab_employee_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicStaff" ADD CONSTRAINT "ClinicStaff_clinic_employee_id_fkey" FOREIGN KEY ("clinic_employee_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "ClinicStaff"("clinic_employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receptionist" ADD CONSTRAINT "Receptionist_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "ClinicStaff"("clinic_employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabSupervisor" ADD CONSTRAINT "LabSupervisor_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "LabStaff"("lab_employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabAssistant" ADD CONSTRAINT "LabAssistant_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "LabStaff"("lab_employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_receptionist_id_fkey" FOREIGN KEY ("receptionist_id") REFERENCES "Receptionist"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examination" ADD CONSTRAINT "Examination_exam_code_fkey" FOREIGN KEY ("exam_code") REFERENCES "ExaminationDictionary"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExamination" ADD CONSTRAINT "PhysicalExamination_physical_exam_id_fkey" FOREIGN KEY ("physical_exam_id") REFERENCES "Examination"("examination_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExamination" ADD CONSTRAINT "PhysicalExamination_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "Visit"("visit_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryExamination" ADD CONSTRAINT "LaboratoryExamination_laboratory_exam_id_fkey" FOREIGN KEY ("laboratory_exam_id") REFERENCES "Examination"("examination_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryExamination" ADD CONSTRAINT "LaboratoryExamination_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "Visit"("visit_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryExamination" ADD CONSTRAINT "LaboratoryExamination_lab_assistant_id_fkey" FOREIGN KEY ("lab_assistant_id") REFERENCES "LabAssistant"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
