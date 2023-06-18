import { PrismaClient, Prisma } from "@prisma/client";
import { hashPassword } from "../src/lib/hashPassword";
import cuid from 'cuid';
const prisma = new PrismaClient();


async function seed() {
  //59
  const examinationDictionarySeedData: Prisma.ExaminationDictionaryCreateInput[] = [
    {
      code: "1",
      name: "Covid-19",
      type: "lab",
      description: "swab from the nose"
    },
    {
      code: "2",
      name: "Complete Blood Count (CBC)",
      type: "lab",
      description: "blood test to evaluate overall health"
    },
    {
      code: "3",
      name: "Cholesterol Profile",
      type: "lab",
      description: "measures different types of cholesterol in the blood"
    },
    {
      code: "4",
      name: "Thyroid Function Panel",
      type: "lab",
      description: "evaluates thyroid gland function"
    },
    {
      code: "5",
      name: "Liver Function Tests",
      type: "lab",
      description: "assesses liver health and function"
    },
    {
      code: "6",
      name: "Kidney Function Tests",
      type: "lab",
      description: "measures kidney function and health"
    },
    {
      code: "7",
      name: "Hemoglobin A1c (HbA1c)",
      type: "lab",
      description: "monitors blood sugar control over time"
    },
    {
      code: "8",
      name: "Urinalysis",
      type: "lab",
      description: "analyzes urine for various markers of health and disease"
    },
    {
      code: "9",
      name: "Stool Culture",
      type: "lab",
      description: "detects bacteria or parasites in the stool"
    },
    {
      code: "10",
      name: "Electrocardiogram (ECG)",
      type: "lab",
      description: "measures the electrical activity of the heart"
    },
    {
      code: "11",
      name: "Chest X-ray",
      type: "lab",
      description: "produces an image of the chest to evaluate the lungs and heart"
    },
    {
      code: "12",
      name: "Bone Density Scan",
      type: "lab",
      description: "measures bone density to assess risk of osteoporosis"
    },
    {
      code: "13",
      name: "Pap Smear",
      type: "lab",
      description: "screens for cervical cancer or abnormalities"
    },
    {
      code: "14",
      name: "Prostate-Specific Antigen (PSA) Test",
      type: "lab",
      description: "screens for prostate cancer or other prostate conditions"
    },
    {
      code: "15",
      name: "Mammogram",
      type: "lab",
      description: "screens for breast cancer or abnormalities"
    },
    {
      code: "16",
      name: "Colonoscopy",
      type: "lab",
      description: "examines the colon for abnormalities or polyps"
    },
    {
      code: "17",
      name: "Allergy Testing",
      type: "lab",
      description: "identifies allergens causing allergic reactions"
    },
    {
      code: "18",
      name: "HIV Test",
      type: "lab",
      description: "detects the presence of HIV antibodies or antigens"
    },
    {
      code: "19",
      name: "Syphilis Test",
      type: "lab",
      description: "checks for syphilis infection"
    },
    {
      code: "20",
      name: "Hepatitis Panel",
      type: "lab",
      description: "screens for hepatitis A, B, or C infections"
    },
    {
      code: "21",
      name: "Lipid Profile",
      type: "lab",
      description: "measures cholesterol and triglyceride levels"
    },
    {
      code: "22",
      name: "Glucose Tolerance Test",
      type: "lab",
      description: "evaluates how the body processes glucose"
    },
    {
      code: "23",
      name: "Thyroid Antibody Tests",
      type: "lab",
      description: "checks for antibodies associated with thyroid disorders"
    },
    {
      code: "24",
      name: "C-reactive Protein (CRP) Test",
      type: "lab",
      description: "measures inflammation levels in the body"
    },
    {
      code: "25",
      name: "Lung Function Tests",
      type: "lab",
      description: "assesses lung capacity and function"
    },
    {
      code: "26",
      name: "Rapid Influenza Diagnostic Test (RIDT)",
      type: "lab",
      description: "detects influenza virus quickly"
    },
    {
      code: "27",
      name: "Strep Throat Test",
      type: "lab",
      description: "checks for streptococcal infection in the throat"
    },
    {
      code: "28",
      name: "Blood Culture",
      type: "lab",
      description: "identifies bacteria or fungi in the blood"
    },
    {
      code: "29",
      name: "Vitamin D Test",
      type: "lab",
      description: "measures vitamin D levels in the blood"
    },
    {
      code: "30",
      name: "Vital signs assessment",
      type: "physical",
      description: "measures the patient's blood pressure, heart rate, respiratory rate, and temperature"
    },
    {
      code: "31",
      name: "Head and neck examination",
      type: "physical",
      description: "examines the head, neck, and related structures for abnormalities"
    },
    {
      code: "32",
      name: "Cardiovascular examination",
      type: "physical",
      description: "evaluates the heart and blood vessels for signs of disease or abnormalities"
    },
    {
      code: "33",
      name: "Respiratory examination",
      type: "physical",
      description: "assesses the lungs and respiratory system for any issues or abnormalities"
    },
    {
      code: "34",
      name: "Abdominal examination",
      type: "physical",
      description: "checks the abdomen for signs of tenderness, masses, or abnormalities"
    },
    {
      code: "35",
      name: "Neurological examination",
      type: "physical",
      description: "evaluates the nervous system, including reflexes, sensation, and coordination"
    },
    {
      code: "36",
      name: "Musculoskeletal examination",
      type: "physical",
      description: "assesses the muscles, joints, and bones for any abnormalities or range of motion issues"
    },
    {
      code: "37",
      name: "Dermatological examination",
      type: "physical",
      description: "checks the skin for rashes, lesions, or other dermatological conditions"
    },
    {
      code: "38",
      name: "Eye examination",
      type: "physical",
      description: "evaluates the eyes for visual acuity, eye movements, and signs of eye diseases"
    },
    {
      code: "39",
      name: "Ear examination",
      type: "physical",
      description: "checks the ears for any abnormalities, infections, or hearing issues"
    },
    {
      code: "40",
      name: "Throat examination",
      type: "physical",
      description: "examines the throat and tonsils for signs of infection or abnormalities"
    },
    {
      code: "41",
      name: "Lymph node examination",
      type: "physical",
      description: "checks the lymph nodes for any enlargement or tenderness"
    },
    {
      code: "42",
      name: "Breast examination",
      type: "physical",
      description: "assesses the breasts for any lumps, masses, or abnormalities"
    },
    {
      code: "43",
      name: "Pelvic examination",
      type: "physical",
      description: "examines the pelvic organs in females and assesses for any abnormalities"
    },
    {
      code: "44",
      name: "Genital examination",
      type: "physical",
      description: "evaluates the male genitalia for any abnormalities or signs of disease"
    },
    {
      code: "45",
      name: "Rectal examination",
      type: "physical",
      description: "checks the rectum and anus for any abnormalities or signs of disease"
    },
    {
      code: "46",
      name: "Back examination",
      type: "physical",
      description: "evaluates the back for any deformities, tenderness, or range of motion issues"
    },
    {
      code: "47",
      name: "Joint examination",
      type: "physical",
      description: "assesses the individual joints for any swelling, tenderness, or limited range of motion"
    },
    {
      code: "48",
      name: "Gait and balance assessment",
      type: "physical",
      description: "evaluates the patient's walking pattern and balance abilities"
    },
    {
      code: "49",
      name: "Cognitive assessment",
      type: "physical",
      description: "tests the patient's cognitive function, memory, and mental status"
    },
    {
      code: "50",
      name: "Emotional well-being assessment",
      type: "physical",
      description: "evaluates the patient's emotional state, mood, and overall well-being"
    },
    {
      code: "51",
      name: "Nutritional assessment",
      type: "physical",
      description: "assesses the patient's nutritional status and dietary habits"
    },
    {
      code: "52",
      name: "Oral examination",
      type: "physical",
      description: "checks the oral cavity, teeth, and gums for any issues or abnormalities"
    },
    {
      code: "53",
      name: "Genetic screening",
      type: "physical",
      description: "screens for genetic disorders or inherited conditions"
    },
    {
      code: "54",
      name: "Weight and body composition assessment",
      type: "physical",
      description: "measures the patient's weight and body composition, such as body fat percentage"
    },
    {
      code: "55",
      name: "Height measurement",
      type: "physical",
      description: "measures the patient's height using a height scale or measuring tape"
    },
    {
      code: "56",
      name: "Blood pressure measurement",
      type: "physical",
      description: "checks the patient's blood pressure using a sphygmomanometer"
    },
    {
      code: "57",
      name: "Heart rate assessment",
      type: "physical",
      description: "measures the patient's heart rate using a stethoscope or pulse oximeter"
    },
    {
      code: "58",
      name: "Respiratory rate assessment",
      type: "physical",
      description: "counts the patient's breaths per minute to determine the respiratory rate"
    },
    {
      code: "59",
      name: "Temperature measurement",
      type: "physical",
      description: "checks the patient's body temperature using a thermometer"
    }
  ]
  //54 users in total
  // 20 patients
  // 22 doctors
  // 2 receptionists
  // 6 lab assistants
  // 4 lab supervisors
  const userData: Prisma.UserCreateInput[] = [
    //====================PATIENTS=================
    {
      firstName: "Patient",
      lastName: "One",
      sex: "F",
      nationalId: cuid(),
      id: "P1",
      email: "patient1@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { "insuranceId": "123456719" } }
    },
    {
      firstName: "Patient",
      lastName: "Two",
      sex: "F",
      nationalId: cuid(),
      id: "P2",
      email: "patient2@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "237567890" } }
    },
    {
      firstName: "Patient",
      lastName: "Three",
      sex: "M",
      nationalId: cuid(),
      id: "P3",
      email: "patient3@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "345478901" } }
    },
    {
      firstName: "Patient",
      lastName: "Four",
      sex: "F",
      nationalId: cuid(),
      id: "P4",
      email: "patient4@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "45sd89012" } }
    },
    {
      firstName: "Patient",
      lastName: "Five",
      sex: "M",
      nationalId: cuid(),
      id: "P5",
      email: "patient5@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "567890123" } }
    },
    {
      firstName: "Patient",
      lastName: "Six",
      sex: "F",
      nationalId: cuid(),
      id: "P6",
      email: "patient6@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "6789ds01234" } }
    },
    {
      firstName: "Patient",
      lastName: "Seven",
      sex: "F",
      nationalId: cuid(),
      id: "P7",
      email: "patient7@gmail.com",
      emailVerified: "2022-04-08T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "890123456" } }
    },
    {
      firstName: "Patient",
      lastName: "Eight",
      sex: "M",
      nationalId: cuid(),
      id: "P8",
      email: "patient8@gmail.com",
      emailVerified: "2022-04-09T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "901234567" } }
    },
    {
      firstName: "Patient",
      lastName: "Nine",
      sex: "F",
      nationalId: cuid(),
      id: "P9",
      email: "patient9@gmail.com",
      emailVerified: "2022-04-10T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "012345678" } }
    },
    {
      firstName: "Patient",
      lastName: "Ten",
      sex: "M",
      nationalId: cuid(),
      id: "P10",
      email: "patient10@gmail.com",
      emailVerified: "2022-04-11T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "1234sa56789" } }
    },
    {
      firstName: "Patient",
      lastName: "Eleven",
      sex: "F",
      nationalId: cuid(),
      id: "P11",
      email: "patient11@gmail.com",
      emailVerified: "2022-04-12T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "2345678q90" } }
    },
    {
      firstName: "Patient",
      lastName: "Twelve",
      sex: "M",
      nationalId: cuid(),
      id: "P12",
      email: "patient12@gmail.com",
      emailVerified: "2022-04-13T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "345678901" } }
    },
    {
      firstName: "Patient",
      lastName: "Thirteen",
      sex: "F",
      nationalId: cuid(),
      id: "P13",
      email: "patient13@gmail.com",
      emailVerified: "2022-04-14T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "456789012" } }
    },
    {
      firstName: "Patient",
      lastName: "Forteen",
      sex: "F",
      nationalId: cuid(),
      id: "P14",
      email: "patient14@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "678901234" } }
    },
    {
      firstName: "Patient",
      lastName: "Fifteen",
      sex: "M",
      nationalId: cuid(),
      id: "P15",
      email: "patient15@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "676890124" } }
    },
    {
      firstName: "Patient",
      lastName: "Sixteen",
      sex: "F",
      nationalId: cuid(),
      id: "P16",
      email: "patient16@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "798901234" } }
    },
    {
      firstName: "Patient",
      lastName: "Seventeen",
      sex: "M",
      nationalId: cuid(),
      id: "P17",
      email: "patient17@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "809012345" } }
    },
    {
      firstName: "Patient",
      lastName: "Eighteen",
      sex: "F",
      nationalId: cuid(),
      id: "P18",
      email: "patient18@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "910123456" } }
    },
    {
      firstName: "Patient",
      lastName: "Nineteen",
      sex: "M",
      nationalId: cuid(),
      id: "P19",
      email: "patient19@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "021234567" } }
    },
    {
      firstName: "Patient",
      lastName: "Twenty",
      sex: "F",
      nationalId: cuid(),
      id: "P20",
      email: "patient20@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "PATIENT",
      patient: { create: { insuranceId: "132345678" } }
    },
    //====================DOCTORS=================
    {
      firstName: "Doctor",
      lastName: "One",
      sex: "M",
      id: "D1",
      nationalId: cuid(),
      email: "doctor1@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "GENERAL_PRACTICE" } }
    },
    {
      firstName: "Doctor",
      lastName: "Two",
      sex: "M",
      id: "D2",
      nationalId: cuid(),
      email: "doctor2@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "INTERNAL_MEDICINE" } }
    },
    {
      firstName: "Doctor",
      lastName: "Three",
      sex: "M",
      id: "D3",
      nationalId: cuid(),
      email: "doctor3@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "PEDIATRICS" } }
    },
    {
      firstName: "Doctor",
      lastName: "Four",
      sex: "M",
      id: "D4",
      nationalId: cuid(),
      email: "doctor4@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "OBSTETRICS_AND_GYNECOLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Five",
      sex: "F",
      id: "D5",
      nationalId: cuid(),
      email: "doctor5@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "CARDIOLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Six",
      sex: "M",
      id: "D6",
      nationalId: cuid(),
      email: "doctor6@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "DERMATOLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Seven",
      sex: "M",
      id: "D7",
      nationalId: cuid(),
      email: "doctor7@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "ORTHOPEDICS" } }
    },
    {
      firstName: "Doctor",
      lastName: "Eight",
      sex: "F",
      id: "D8",
      nationalId: cuid(),
      email: "doctor8@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "GASTROENTEROLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Nine",
      sex: "F",
      id: "D9",
      nationalId: cuid(),
      email: "doctor9@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "NEUROLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Ten",
      sex: "M",
      id: "D10",
      nationalId: cuid(),
      email: "doctor10@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "PSYCHIATRY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Eleven",
      sex: "F",
      id: "D11",
      nationalId: cuid(),
      email: "doctor11@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "UROLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Twelve",
      sex: "M",
      id: "D12",
      nationalId: cuid(),
      email: "doctor12@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "OPHTHALMOLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Thirteen",
      sex: "M",
      id: "D13",
      nationalId: cuid(),
      email: "doctor13@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "ENDOCRINOLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Fourteen",
      sex: "M",
      id: "D14",
      nationalId: cuid(),
      email: "doctor14@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "ONCOLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Fifteen",
      sex: "F",
      id: "D15",
      nationalId: cuid(),
      email: "doctor15@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "RHEUMATOLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Sixteen",
      sex: "M",
      id: "D16",
      nationalId: cuid(),
      email: "doctor16@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "ALLERGY_AND_IMMUNOLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Seventeen",
      sex: "F",
      id: "D17",
      nationalId: cuid(),
      email: "doctor17@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "SURGERY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Eighteen",
      sex: "M",
      id: "D18",
      nationalId: cuid(),
      email: "doctor18@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "GENERAL_PRACTICE" } }
    },
    {
      firstName: "Doctor",
      lastName: "Nineteen",
      sex: "F",
      id: "D19",
      nationalId: cuid(),
      email: "doctor19@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "INTERNAL_MEDICINE" } }
    },
    {
      firstName: "Doctor",
      lastName: "Twenty",
      sex: "M",
      id: "D20",
      nationalId: cuid(),
      email: "doctor20@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "PEDIATRICS" } }
    },
    {
      firstName: "Doctor",
      lastName: "Twenty-One",
      sex: "F",
      id: "D21",
      nationalId: cuid(),
      email: "doctor21@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "OBSTETRICS_AND_GYNECOLOGY" } }
    },
    {
      firstName: "Doctor",
      lastName: "Twenty-Two",
      sex: "M",
      id: "D22",
      nationalId: cuid(),
      email: "doctor22@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "DOCTOR",
      doctor: { create: { speciality: "CARDIOLOGY" } }
    },
    //====================RECEPTIONIST=================
    {
      firstName: "Receptionist",
      lastName: "One",
      sex: "F",
      id: "R1",
      nationalId: cuid(),
      email: "receptionist1@gmail.com",
      emailVerified: "2022-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "RECEPTIONIST",
      receptionist: { create: {} }
    },
    {
      firstName: "Receptionist",
      lastName: "Two",
      sex: "F",
      id: "R2",
      nationalId: cuid(),
      email: "receptionist2@gmail.com",
      emailVerified: "2022-01-02T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "RECEPTIONIST",
      receptionist: { create: {} }
    },

    //====================LAB_ASSISTANT=================
    {
      firstName: "Assistant",
      lastName: "One",
      sex: "F",
      id: "T1",
      nationalId: cuid(),
      email: "assistant1@gmail.com",
      emailVerified: "2023-04-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_ASSISTANT",
      labAssistant: { create: {} }
    },
    {
      firstName: "Assistant",
      lastName: "Two",
      sex: "F",
      id: "T2",
      nationalId: cuid(),
      email: "assistant2@gmail.com",
      emailVerified: "2023-04-08T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_ASSISTANT",
      labAssistant: { create: {} }
    },
    {
      firstName: "Assistant",
      lastName: "Three",
      sex: "M",
      id: "T3",
      nationalId: cuid(),
      email: "assistant3@gmail.com",
      emailVerified: "2023-04-09T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_ASSISTANT",
      labAssistant: { create: {} }
    },
    {
      firstName: "Assistant",
      lastName: "Four",
      sex: "F",
      id: "T4",
      nationalId: cuid(),
      email: "assistant4@gmail.com",
      emailVerified: "2023-04-10T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_ASSISTANT",
      labAssistant: { create: {} }
    },
    {
      firstName: "Assistant",
      lastName: "Five",
      sex: "M",
      id: "T5",
      nationalId: cuid(),
      email: "assistant5@gmail.com",
      emailVerified: "2023-04-11T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_ASSISTANT",
      labAssistant: { create: {} }
    },
    {
      firstName: "Assistant",
      lastName: "Six",
      sex: "F",
      id: "T6",
      nationalId: cuid(),
      email: "assistant6@gmail.com",
      emailVerified: "2023-04-12T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_ASSISTANT",
      labAssistant: { create: {} }
    },

    //====================LAB_SUPERVISOR=================
    {
      firstName: "Supervisor",
      lastName: "One",
      sex: "M",
      id: "S1",
      nationalId: cuid(),
      email: "supervisor1@gmail.com",
      emailVerified: "2021-07-07T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_SUPERVISOR",
      labSupervisor: { create: {} }
    },
    {
      firstName: "Supervisor",
      lastName: "Two",
      sex: "M",
      id: "S2",
      nationalId: cuid(),
      email: "supervisor2@gmail.com",
      emailVerified: "2021-07-08T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_SUPERVISOR",
      labSupervisor: { create: {} }
    },
    {
      firstName: "Supervisor",
      lastName: "Three",
      sex: "F",
      id: "S3",
      nationalId: cuid(),
      email: "supervisor3@gmail.com",
      emailVerified: "2021-07-09T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_SUPERVISOR",
      labSupervisor: { create: {} }
    },
    {
      firstName: "Supervisor",
      lastName: "Four",
      sex: "M",
      id: "S4",
      nationalId: cuid(),
      email: "supervisor4@gmail.com",
      emailVerified: "2021-07-10T21:05:53.424Z",
      password: await hashPassword("password123"),
      role: "LAB_SUPERVISOR",
      labSupervisor: { create: {} }
    }
  ];

  // 70 visits : 10 past, 60 future 
  const visitData: Prisma.VisitCreateInput[] = [
    //=================PAST==============
    {
      description: "Visit 1",
      diagnosis: "Common cold",
      visitId: "1",
      date: "2023-03-29T16:30:00.000Z",
      dateRealized: "2023-03-29T16:30:00.000Z",
      status: "COMPLETED",
      doctor: { connect: { employeeId: "D1" } },
      patient: { connect: { patientId: "P1" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      description: "Visit 2",
      diagnosis: "Headache",
      visitId: "2",
      date: "2023-04-01T10:45:00.000Z",
      dateRealized: "2023-04-01T10:45:00.000Z",
      status: "COMPLETED",
      doctor: { connect: { employeeId: "D2" } },
      patient: { connect: { patientId: "P2" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      description: "Visit 3",
      diagnosis: "Allergies",
      visitId: "3",
      date: "2023-04-04T14:15:00.000Z",
      dateRealized: "2023-04-04T14:15:00.000Z",
      status: "COMPLETED",
      doctor: { connect: { employeeId: "D3" } },
      patient: { connect: { patientId: "P3" } }
    },
    {
      description: "Visit 4",
      diagnosis: "Sprained ankle",
      visitId: "4",
      date: "2023-04-07T09:30:00.000Z",
      dateRealized: "2023-04-07T09:30:00.000Z",
      status: "COMPLETED",
      doctor: { connect: { employeeId: "D4" } },
      patient: { connect: { patientId: "P4" } }
    },
    {
      description: "Visit 5",
      diagnosis: "Fever",
      visitId: "5",
      date: "2023-04-10T11:00:00.000Z",
      dateRealized: "2023-04-10T11:00:00.000Z",
      status: "CANCELLED",
      doctor: { connect: { employeeId: "D5" } },
      patient: { connect: { patientId: "P5" } }
    },
    {
      description: "Visit 6",
      diagnosis: "Stomachache",
      visitId: "6",
      date: "2023-04-12T11:30:00.000Z",
      dateRealized: "2023-04-12T11:30:00.000Z",
      status: "COMPLETED",
      doctor: { connect: { employeeId: "D5" } },
      patient: { connect: { patientId: "P6" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      description: "Visit 7",
      diagnosis: "Back pain",
      visitId: "7",
      date: "2023-04-15T14:00:00.000Z",
      dateRealized: "2023-04-15T14:00:00.000Z",
      status: "COMPLETED",
      doctor: { connect: { employeeId: "D6" } },
      patient: { connect: { patientId: "P7" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      description: "Visit 8",
      diagnosis: "Sore throat",
      visitId: "8",
      date: "2023-04-18T09:15:00.000Z",
      dateRealized: "2023-04-18T09:15:00.000Z",
      status: "CANCELLED",
      doctor: { connect: { employeeId: "D7" } },
      patient: { connect: { patientId: "P8" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      description: "Visit 9",
      diagnosis: "Sinus infection",
      visitId: "9",
      date: "2023-04-21T15:45:00.000Z",
      dateRealized: "2023-04-21T15:45:00.000Z",
      status: "COMPLETED",
      doctor: { connect: { employeeId: "D8" } },
      patient: { connect: { patientId: "P9" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      description: "Visit 10",
      diagnosis: "High blood pressure",
      visitId: "10",
      date: "2023-04-24T13:30:00.000Z",
      dateRealized: "2023-04-24T13:30:00.000Z",
      status: "COMPLETED",
      doctor: { connect: { employeeId: "D9" } },
      patient: { connect: { patientId: "P10" } },
      receptionist: { connect: { employeeId: "R1" } }
    },

    //=================FUTURE==============
    {
      visitId: "11",
      date: "2023-06-29T16:30:00.000Z",
      doctor: { connect: { employeeId: "D5" } },
      patient: { connect: { patientId: "P8" } }
    },
    {
      visitId: "12",
      date: "2023-06-28T16:30:00.000Z",
      doctor: { connect: { employeeId: "D5" } },
      patient: { connect: { patientId: "P8" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "13",
      date: "2023-06-27T16:30:00.000Z",
      doctor: { connect: { employeeId: "D6" } },
      patient: { connect: { patientId: "P9" } }
    },
    {
      visitId: "14",
      date: "2023-06-26T16:30:00.000Z",
      doctor: { connect: { employeeId: "D6" } },
      patient: { connect: { patientId: "P9" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "15",
      date: "2023-06-25T16:30:00.000Z",
      doctor: { connect: { employeeId: "D7" } },
      patient: { connect: { patientId: "P10" } }
    },
    {
      visitId: "16",
      date: "2023-06-24T16:30:00.000Z",
      doctor: { connect: { employeeId: "D7" } },
      patient: { connect: { patientId: "P10" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "17",
      date: "2023-06-23T16:30:00.000Z",
      doctor: { connect: { employeeId: "D8" } },
      patient: { connect: { patientId: "P11" } }
    },
    {
      visitId: "18",
      date: "2023-06-22T16:30:00.000Z",
      doctor: { connect: { employeeId: "D8" } },
      patient: { connect: { patientId: "P11" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "19",
      date: "2023-06-21T16:30:00.000Z",
      doctor: { connect: { employeeId: "D9" } },
      patient: { connect: { patientId: "P12" } }
    },
    {
      visitId: "20",
      date: "2023-06-20T16:30:00.000Z",
      doctor: { connect: { employeeId: "D9" } },
      patient: { connect: { patientId: "P12" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "21",
      date: "2023-06-19T16:30:00.000Z",
      doctor: { connect: { employeeId: "D10" } },
      patient: { connect: { patientId: "P3" } }
    },
    {
      visitId: "22",
      date: "2023-06-18T16:30:00.000Z",
      doctor: { connect: { employeeId: "D10" } },
      patient: { connect: { patientId: "P3" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "23",
      date: "2023-06-17T16:30:00.000Z",
      doctor: { connect: { employeeId: "D11" } },
      patient: { connect: { patientId: "P4" } }
    },
    {
      visitId: "24",
      date: "2023-06-16T16:30:00.000Z",
      doctor: { connect: { employeeId: "D1" } },
      patient: { connect: { patientId: "P4" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "25",
      date: "2023-06-15T16:30:00.000Z",
      doctor: { connect: { employeeId: "D2" } },
      patient: { connect: { patientId: "P5" } }
    },
    {
      visitId: "26",
      date: "2023-06-14T16:30:00.000Z",
      doctor: { connect: { employeeId: "D2" } },
      patient: { connect: { patientId: "P15" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "27",
      date: "2023-06-13T16:30:00.000Z",
      doctor: { connect: { employeeId: "D13" } },
      patient: { connect: { patientId: "P16" } }
    },
    {
      visitId: "28",
      date: "2023-06-12T16:30:00.000Z",
      doctor: { connect: { employeeId: "D3" } },
      patient: { connect: { patientId: "P6" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "29",
      date: "2023-06-11T16:30:00.000Z",
      doctor: { connect: { employeeId: "D4" } },
      patient: { connect: { patientId: "P7" } }
    },
    {
      visitId: "30",
      date: "2023-06-10T16:30:00.000Z",
      doctor: { connect: { employeeId: "D4" } },
      patient: { connect: { patientId: "P7" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "31",
      date: "2023-07-09T16:30:00.000Z",
      doctor: { connect: { employeeId: "D5" } },
      patient: { connect: { patientId: "P8" } }
    },
    {
      visitId: "32",
      date: "2023-07-08T16:30:00.000Z",
      doctor: { connect: { employeeId: "D5" } },
      patient: { connect: { patientId: "P8" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "33",
      date: "2023-07-07T16:30:00.000Z",
      doctor: { connect: { employeeId: "D6" } },
      patient: { connect: { patientId: "P9" } }
    },
    {
      visitId: "34",
      date: "2023-07-06T16:30:00.000Z",
      doctor: { connect: { employeeId: "D6" } },
      patient: { connect: { patientId: "P9" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "35",
      date: "2023-07-05T16:30:00.000Z",
      doctor: { connect: { employeeId: "D7" } },
      patient: { connect: { patientId: "P10" } }
    },
    {
      visitId: "36",
      date: "2023-07-04T16:30:00.000Z",
      doctor: { connect: { employeeId: "D7" } },
      patient: { connect: { patientId: "P10" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "37",
      date: "2023-07-03T16:30:00.000Z",
      doctor: { connect: { employeeId: "D8" } },
      patient: { connect: { patientId: "P11" } }
    },
    {
      visitId: "38",
      date: "2023-07-02T16:30:00.000Z",
      doctor: { connect: { employeeId: "D8" } },
      patient: { connect: { patientId: "P11" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "39",
      date: "2023-07-01T16:30:00.000Z",
      doctor: { connect: { employeeId: "D9" } },
      patient: { connect: { patientId: "P12" } }
    },
    {
      visitId: "40",
      date: "2023-07-30T16:30:00.000Z",
      doctor: { connect: { employeeId: "D9" } },
      patient: { connect: { patientId: "P12" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "41",
      date: "2023-07-29T16:30:00.000Z",
      doctor: { connect: { employeeId: "D1" } },
      patient: { connect: { patientId: "P1" } }
    },
    {
      visitId: "42",
      date: "2023-07-28T16:30:00.000Z",
      doctor: { connect: { employeeId: "D1" } },
      patient: { connect: { patientId: "P1" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "43",
      date: "2023-07-27T16:30:00.000Z",
      doctor: { connect: { employeeId: "D2" } },
      patient: { connect: { patientId: "P2" } }
    },
    {
      visitId: "44",
      date: "2023-07-26T16:30:00.000Z",
      doctor: { connect: { employeeId: "D2" } },
      patient: { connect: { patientId: "P2" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "45",
      date: "2023-07-25T16:30:00.000Z",
      doctor: { connect: { employeeId: "D3" } },
      patient: { connect: { patientId: "P3" } }
    },
    {
      visitId: "46",
      date: "2023-07-24T16:30:00.000Z",
      doctor: { connect: { employeeId: "D3" } },
      patient: { connect: { patientId: "P3" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "47",
      date: "2023-07-23T16:30:00.000Z",
      doctor: { connect: { employeeId: "D4" } },
      patient: { connect: { patientId: "P4" } }
    },
    {
      visitId: "48",
      date: "2023-07-22T16:30:00.000Z",
      doctor: { connect: { employeeId: "D4" } },
      patient: { connect: { patientId: "P4" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "49",
      date: "2023-07-21T16:30:00.000Z",
      doctor: { connect: { employeeId: "D5" } },
      patient: { connect: { patientId: "P5" } }
    },
    {
      visitId: "50",
      date: "2023-07-20T16:30:00.000Z",
      doctor: { connect: { employeeId: "D5" } },
      patient: { connect: { patientId: "P5" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "51",
      date: "2023-07-19T16:30:00.000Z",
      doctor: { connect: { employeeId: "D6" } },
      patient: { connect: { patientId: "P6" } }
    },
    {
      visitId: "52",
      date: "2023-07-18T16:30:00.000Z",
      doctor: { connect: { employeeId: "D6" } },
      patient: { connect: { patientId: "P6" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "53",
      date: "2023-07-17T16:30:00.000Z",
      doctor: { connect: { employeeId: "D7" } },
      patient: { connect: { patientId: "P7" } }
    },
    {
      visitId: "54",
      date: "2023-07-16T16:30:00.000Z",
      doctor: { connect: { employeeId: "D7" } },
      patient: { connect: { patientId: "P7" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "55",
      date: "2023-07-15T16:30:00.000Z",
      doctor: { connect: { employeeId: "D8" } },
      patient: { connect: { patientId: "P8" } }
    },
    {
      visitId: "56",
      date: "2023-07-14T16:30:00.000Z",
      doctor: { connect: { employeeId: "D8" } },
      patient: { connect: { patientId: "P8" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "57",
      date: "2023-07-13T16:30:00.000Z",
      doctor: { connect: { employeeId: "D9" } },
      patient: { connect: { patientId: "P9" } }
    },
    {
      visitId: "58",
      date: "2023-07-12T16:30:00.000Z",
      doctor: { connect: { employeeId: "D9" } },
      patient: { connect: { patientId: "P9" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "59",
      date: "2023-07-11T16:30:00.000Z",
      doctor: { connect: { employeeId: "D10" } },
      patient: { connect: { patientId: "P10" } }
    },
    {
      visitId: "60",
      date: "2023-07-10T16:30:00.000Z",
      doctor: { connect: { employeeId: "D10" } },
      patient: { connect: { patientId: "P10" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "61",
      date: "2023-07-19T16:30:00.000Z",
      doctor: { connect: { employeeId: "D5" } },
      patient: { connect: { patientId: "P11" } }
    },
    {
      visitId: "62",
      date: "2023-07-18T16:30:00.000Z",
      doctor: { connect: { employeeId: "D1" } },
      patient: { connect: { patientId: "P4" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "63",
      date: "2023-07-17T16:30:00.000Z",
      doctor: { connect: { employeeId: "D9" } },
      patient: { connect: { patientId: "P8" } }
    },
    {
      visitId: "64",
      date: "2023-07-16T16:30:00.000Z",
      doctor: { connect: { employeeId: "D3" } },
      patient: { connect: { patientId: "P10" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "65",
      date: "2023-07-15T16:30:00.000Z",
      doctor: { connect: { employeeId: "D10" } },
      patient: { connect: { patientId: "P3" } }
    },
    {
      visitId: "66",
      date: "2023-07-14T16:30:00.000Z",
      doctor: { connect: { employeeId: "D2" } },
      patient: { connect: { patientId: "P7" } },
      receptionist: { connect: { employeeId: "R2" } }
    },
    {
      visitId: "67",
      date: "2023-07-13T16:30:00.000Z",
      doctor: { connect: { employeeId: "D7" } },
      patient: { connect: { patientId: "P6" } }
    },
    {
      visitId: "68",
      date: "2023-07-12T16:30:00.000Z",
      doctor: { connect: { employeeId: "D4" } },
      patient: { connect: { patientId: "P12" } },
      receptionist: { connect: { employeeId: "R1" } }
    },
    {
      visitId: "69",
      date: "2023-07-11T16:30:00.000Z",
      doctor: { connect: { employeeId: "D6" } },
      patient: { connect: { patientId: "P1" } }
    },
    {
      visitId: "70",
      date: "2023-07-10T16:30:00.000Z",
      doctor: { connect: { employeeId: "D8" } },
      patient: { connect: { patientId: "P9" } },
      receptionist: { connect: { employeeId: "R2" } }
    },

  ]

  //30
  const labExaminationData: Prisma.LaboratoryExaminationCreateInput[] = [
    {
      doctorNote: "",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "1" } },
      examinationDictionary: { connect: { code: "1" } }
    },
    {
      doctorNote: "",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "2" } },
      examinationDictionary: { connect: { code: "2" } }
    },
    {
      doctorNote: "Please fast for 12 hours before the test.",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "3" } },
      examinationDictionary: { connect: { code: "3" } }
    },
    {
      doctorNote: "",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "4" } },
      examinationDictionary: { connect: { code: "4" } }
    },
    {
      doctorNote: "Take the medication as prescribed before the test.",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "5" } },
      examinationDictionary: { connect: { code: "5" } }
    },
    {
      doctorNote: "",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "6" } },
      examinationDictionary: { connect: { code: "6" } }
    },
    {
      doctorNote: "",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "7" } },
      examinationDictionary: { connect: { code: "7" } }
    },
    {
      doctorNote: "Avoid eating seafood before the test.",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "8" } },
      examinationDictionary: { connect: { code: "8" } }
    },
    {
      doctorNote: "",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "9" } },
      examinationDictionary: { connect: { code: "9" } }
    },
    {
      doctorNote: "Please bring any relevant medical reports.",
      status: "ORDERED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      visit: { connect: { visitId: "10" } },
      examinationDictionary: { connect: { code: "10" } }
    },
    {
      doctorNote: "",
      status: "COMPLETED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-01T10:30:00.000Z",
      result: "Normal",
      labTechnicianNote: "Sample processed successfully.",
      visit: { connect: { visitId: "1" } },
      labAssistant: { connect: { employeeId: "T1" } },
      examinationDictionary: { connect: { code: "11" } }
    },
    {
      doctorNote: "",
      status: "CANCELLED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-02T13:45:00.000Z",
      result: "",
      labTechnicianNote: "Test cancelled due to patient request.",
      visit: { connect: { visitId: "2" } },
      labAssistant: { connect: { employeeId: "T2" } },
      examinationDictionary: { connect: { code: "12" } }
    },
    {
      doctorNote: "Please fast for 12 hours before the test.",
      status: "IN_PROGRESS",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-03T16:15:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "3" } },
      labAssistant: { connect: { employeeId: "T3" } },
      examinationDictionary: { connect: { code: "13" } }
    },
    {
      doctorNote: "",
      status: "COMPLETED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-04T09:00:00.000Z",
      result: "Negative",
      labTechnicianNote: "Test result reviewed and verified.",
      visit: { connect: { visitId: "4" } },
      labAssistant: { connect: { employeeId: "T4" } },
      examinationDictionary: { connect: { code: "14" } }
    },
    {
      doctorNote: "Take the medication as prescribed before the test.",
      status: "CANCELLED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-05T11:30:00.000Z",
      result: "",
      labTechnicianNote: "Test cancelled due to unavailability of equipment.",
      visit: { connect: { visitId: "5" } },
      labAssistant: { connect: { employeeId: "T5" } },
      examinationDictionary: { connect: { code: "15" } }
    },
    {
      doctorNote: "",
      status: "IN_PROGRESS",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-06T14:45:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "6" } },
      labAssistant: { connect: { employeeId: "T6" } },
      examinationDictionary: { connect: { code: "16" } }
    },
    {
      doctorNote: "",
      status: "COMPLETED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-07T17:15:00.000Z",
      result: "Positive",
      labTechnicianNote: "Test result verified and sent to the doctor.",
      visit: { connect: { visitId: "7" } },
      labAssistant: { connect: { employeeId: "T1" } },
      examinationDictionary: { connect: { code: "17" } }
    },
    {
      doctorNote: "Please come in the morning for the test.",
      status: "CANCELLED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-08T09:30:00.000Z",
      result: "",
      labTechnicianNote: "Test cancelled due to patient no-show.",
      visit: { connect: { visitId: "8" } },
      labAssistant: { connect: { employeeId: "T2" } },
      examinationDictionary: { connect: { code: "18" } }
    },
    {
      doctorNote: "",
      status: "IN_PROGRESS",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-09T12:45:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "9" } },
      labAssistant: { connect: { employeeId: "T3" } },
      examinationDictionary: { connect: { code: "19" } }
    },
    {
      doctorNote: "",
      status: "COMPLETED",
      testId: cuid(),
      supervisorNote: "",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-10T15:00:00.000Z",
      result: "Normal",
      labTechnicianNote: "Sample processed successfully.",
      visit: { connect: { visitId: "10" } },
      labAssistant: { connect: { employeeId: "T4" } },
      examinationDictionary: { connect: { code: "20" } }
    },
    {
      doctorNote: "",
      status: "APPROVED",
      testId: cuid(),
      supervisorNote: "Test approved for execution.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-01T10:30:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "1" } },
      labAssistant: { connect: { employeeId: "T1" } },
      examinationDictionary: { connect: { code: "21" } },
      dateOfApprovalXorRejection: "2023-04-02T12:00:00.000Z"
    },
    {
      doctorNote: "",
      status: "REJECTED",
      testId: cuid(),
      supervisorNote: "Test rejected due to incomplete patient information.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-02T13:45:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "2" } },
      labAssistant: { connect: { employeeId: "T2" } },
      examinationDictionary: { connect: { code: "22" } },
      dateOfApprovalXorRejection: "2023-04-03T10:30:00.000Z"
    },
    {
      doctorNote: "Please fast for 12 hours before the test.",
      status: "APPROVED",
      testId: cuid(),
      supervisorNote: "Test approved for execution.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-03T16:15:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "3" } },
      labAssistant: { connect: { employeeId: "T3" } },
      examinationDictionary: { connect: { code: "23" } },
      dateOfApprovalXorRejection: "2023-04-04T08:45:00.000Z"
    },
    {
      doctorNote: "",
      status: "REJECTED",
      testId: cuid(),
      supervisorNote: "Test rejected due to duplicate order.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-04T09:00:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "4" } },
      labAssistant: { connect: { employeeId: "T4" } },
      examinationDictionary: { connect: { code: "24" } },
      dateOfApprovalXorRejection: "2023-04-05T11:15:00.000Z"
    },
    {
      doctorNote: "Take the medication as prescribed before the test.",
      status: "APPROVED",
      testId: cuid(),
      supervisorNote: "Test approved for execution.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-05T11:30:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "5" } },
      labAssistant: { connect: { employeeId: "T5" } },
      examinationDictionary: { connect: { code: "25" } },
      dateOfApprovalXorRejection: "2023-04-06T14:30:00.000Z"
    },
    {
      doctorNote: "",
      status: "REJECTED",
      testId: cuid(),
      supervisorNote: "Test rejected due to incomplete patient information.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-06T14:45:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "6" } },
      labAssistant: { connect: { employeeId: "T6" } },
      examinationDictionary: { connect: { code: "26" } },
      dateOfApprovalXorRejection: "2023-04-07T16:45:00.000Z"
    },
    {
      doctorNote: "",
      status: "APPROVED",
      testId: cuid(),
      supervisorNote: "Test approved for execution.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-07T17:15:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "7" } },
      labAssistant: { connect: { employeeId: "T1" } },
      examinationDictionary: { connect: { code: "27" } },
      dateOfApprovalXorRejection: "2023-04-08T09:00:00.000Z"
    },
    {
      doctorNote: "Please come in the morning for the test.",
      status: "REJECTED",
      testId: cuid(),
      supervisorNote: "Test rejected due to conflicting test orders.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-08T09:30:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "8" } },
      labAssistant: { connect: { employeeId: "T2" } },
      examinationDictionary: { connect: { code: "28" } },
      dateOfApprovalXorRejection: "2023-04-09T12:00:00.000Z"
    },
    {
      doctorNote: "",
      status: "APPROVED",
      testId: cuid(),
      supervisorNote: "Test approved for execution.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-09T12:45:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "9" } },
      labAssistant: { connect: { employeeId: "T3" } },
      examinationDictionary: { connect: { code: "29" } },
      dateOfApprovalXorRejection: "2023-04-10T14:15:00.000Z"
    },
    {
      doctorNote: "",
      status: "REJECTED",
      testId: cuid(),
      supervisorNote: "Test rejected due to insufficient sample quantity.",
      dateCreated: "2023-03-29T16:30:00.000Z",
      dateOfExecutionXorCancelling: "2023-04-10T15:00:00.000Z",
      result: "",
      labTechnicianNote: "",
      visit: { connect: { visitId: "10" } },
      labAssistant: { connect: { employeeId: "T4" } },
      examinationDictionary: { connect: { code: "10" } },
      dateOfApprovalXorRejection: "2023-04-11T09:30:00.000Z"
    }
  ];

  //30
  const physicalExaminationData: Prisma.PhysicalExaminationCreateInput[] = [
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "1" } },
      examinationDictionary: { connect: { code: "31" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "2" } },
      examinationDictionary: { connect: { code: "32" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "3" } },
      examinationDictionary: { connect: { code: "33" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "4" } },
      examinationDictionary: { connect: { code: "34" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "5" } },
      examinationDictionary: { connect: { code: "35" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "6" } },
      examinationDictionary: { connect: { code: "36" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "7" } },
      examinationDictionary: { connect: { code: "37" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "8" } },
      examinationDictionary: { connect: { code: "38" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "9" } },
      examinationDictionary: { connect: { code: "39" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "10" } },
      examinationDictionary: { connect: { code: "40" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "1" } },
      examinationDictionary: { connect: { code: "41" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "2" } },
      examinationDictionary: { connect: { code: "42" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "3" } },
      examinationDictionary: { connect: { code: "43" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "4" } },
      examinationDictionary: { connect: { code: "44" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "5" } },
      examinationDictionary: { connect: { code: "45" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "6" } },
      examinationDictionary: { connect: { code: "46" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "7" } },
      examinationDictionary: { connect: { code: "47" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "8" } },
      examinationDictionary: { connect: { code: "48" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "9" } },
      examinationDictionary: { connect: { code: "49" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "10" } },
      examinationDictionary: { connect: { code: "50" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "1" } },
      examinationDictionary: { connect: { code: "51" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "2" } },
      examinationDictionary: { connect: { code: "52" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "3" } },
      examinationDictionary: { connect: { code: "53" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "4" } },
      examinationDictionary: { connect: { code: "54" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "5" } },
      examinationDictionary: { connect: { code: "55" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "6" } },
      examinationDictionary: { connect: { code: "56" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "7" } },
      examinationDictionary: { connect: { code: "57" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "8" } },
      examinationDictionary: { connect: { code: "58" } }
    },
    {
      physicalExamId: cuid(),
      result: "Normal",
      visit: { connect: { visitId: "9" } },
      examinationDictionary: { connect: { code: "59" } }
    },
    {
      physicalExamId: cuid(),
      result: "Abnormal",
      visit: { connect: { visitId: "10" } },
      examinationDictionary: { connect: { code: "31" } }
    }
  ]





  let i = 0;
  for (const examinationDictionary of examinationDictionarySeedData) {
    i++;
    const e = await prisma.examinationDictionary.create({
      data: examinationDictionary,
    });
    console.log(`Created examinationDictionary with id: ${e.code}, type: ${e.type}, name: ${e.name}`);
  }
  console.log(`created ${i} dict codes`)
  console.log("=============================================\n")


  i = 0;
  for (const user of userData) {
    i++;
    const u = await prisma.user.create({ data: user });
    console.log(`Created ${u.role} with id: ${u.id}`);
  }

  console.log(`created ${i} users`)
  console.log("=============================================\n")

  i = 0;
  for (const visit of visitData) {
    i++;
    const v = await prisma.visit.create({ data: visit });
    console.log(`Created visit with id: ${v.visitId}`);
  }
  console.log(`created ${i} visits`)
  console.log("=============================================\n")

  i = 0;
  for (const labExamination of labExaminationData) {
    i++;
    const l = await prisma.laboratoryExamination.create({
      data: labExamination,
    });
    console.log(`Created labExamination with id: ${l.testId}`)
  }
  console.log(`created ${i} lab exams`)
  console.log("=============================================\n")

  i = 0;
  for (const physicalExamination of physicalExaminationData) {
    i++;
    const p = await prisma.physicalExamination.create({
      data: physicalExamination,
    });
    console.log(`Created physicalExamination with id: ${p.physicalExamId}`);
  }
  console.log(`created ${i} lab physical exams`)
  console.log("=============================================\n")
}



async function main() {
  console.log(`Start seeding NEWWWWW ...`);
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
