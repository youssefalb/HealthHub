import { PrismaClient, Prisma } from "@prisma/client";
import { hashPassword } from "../src/lib/hashPassword";
const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.examinationDictionary.createMany({
      data: [
        {
          name: "Covid-19",
          type: "lab",
          description: "swab from the nose"
        },
        {
          name: "Complete Blood Count (CBC)",
          type: "lab",
          description: "blood test to evaluate overall health"
        },
        {
          name: "Cholesterol Profile",
          type: "lab",
          description: "measures different types of cholesterol in the blood"
        },
        {
          name: "Thyroid Function Panel",
          type: "lab",
          description: "evaluates thyroid gland function"
        },
        {
          name: "Liver Function Tests",
          type: "lab",
          description: "assesses liver health and function"
        },
        {
          name: "Kidney Function Tests",
          type: "lab",
          description: "measures kidney function and health"
        },
        {
          name: "Hemoglobin A1c (HbA1c)",
          type: "lab",
          description: "monitors blood sugar control over time"
        },
        {
          name: "Urinalysis",
          type: "lab",
          description: "analyzes urine for various markers of health and disease"
        },
        {
          name: "Stool Culture",
          type: "lab",
          description: "detects bacteria or parasites in the stool"
        },
        {
          name: "Electrocardiogram (ECG)",
          type: "lab",
          description: "measures the electrical activity of the heart"
        },
        {
          name: "Chest X-ray",
          type: "lab",
          description: "produces an image of the chest to evaluate the lungs and heart"
        },
        {
          name: "Bone Density Scan",
          type: "lab",
          description: "measures bone density to assess risk of osteoporosis"
        },
        {
          name: "Pap Smear",
          type: "lab",
          description: "screens for cervical cancer or abnormalities"
        },
        {
          name: "Prostate-Specific Antigen (PSA) Test",
          type: "lab",
          description: "screens for prostate cancer or other prostate conditions"
        },
        {
          name: "Mammogram",
          type: "lab",
          description: "screens for breast cancer or abnormalities"
        },
        {
          name: "Colonoscopy",
          type: "lab",
          description: "examines the colon for abnormalities or polyps"
        },
        {
          name: "Allergy Testing",
          type: "lab",
          description: "identifies allergens causing allergic reactions"
        },
        {
          name: "HIV Test",
          type: "lab",
          description: "detects the presence of HIV antibodies or antigens"
        },
        {
          name: "Syphilis Test",
          type: "lab",
          description: "checks for syphilis infection"
        },
        {
          name: "Hepatitis Panel",
          type: "lab",
          description: "screens for hepatitis A, B, or C infections"
        },
        {
          name: "Lipid Profile",
          type: "lab",
          description: "measures cholesterol and triglyceride levels"
        },
        {
          name: "Glucose Tolerance Test",
          type: "lab",
          description: "evaluates how the body processes glucose"
        },
        {
          name: "Thyroid Antibody Tests",
          type: "lab",
          description: "checks for antibodies associated with thyroid disorders"
        },
        {
          name: "C-reactive Protein (CRP) Test",
          type: "lab",
          description: "measures inflammation levels in the body"
        },
        {
          name: "Lung Function Tests",
          type: "lab",
          description: "assesses lung capacity and function"
        },
        {
          name: "Rapid Influenza Diagnostic Test (RIDT)",
          type: "lab",
          description: "detects influenza virus quickly"
        },
        {
          name: "Strep Throat Test",
          type: "lab",
          description: "checks for streptococcal infection in the throat"
        },
        {
          name: "Blood Culture",
          type: "lab",
          description: "identifies bacteria or fungi in the blood"
        },
        {
          name: "Vitamin D Test",
          type: "lab",
          description: "measures vitamin D levels in the blood"
        },
        {
          "name": "Vital signs assessment",
          "type": "physical",
          "description": "measures the patient's blood pressure, heart rate, respiratory rate, and temperature"
        },
        {
          "name": "Head and neck examination",
          "type": "physical",
          "description": "examines the head, neck, and related structures for abnormalities"
        },
        {
          "name": "Cardiovascular examination",
          "type": "physical",
          "description": "evaluates the heart and blood vessels for signs of disease or abnormalities"
        },
        {
          "name": "Respiratory examination",
          "type": "physical",
          "description": "assesses the lungs and respiratory system for any issues or abnormalities"
        },
        {
          "name": "Abdominal examination",
          "type": "physical",
          "description": "checks the abdomen for signs of tenderness, masses, or abnormalities"
        },
        {
          "name": "Neurological examination",
          "type": "physical",
          "description": "evaluates the nervous system, including reflexes, sensation, and coordination"
        },
        {
          "name": "Musculoskeletal examination",
          "type": "physical",
          "description": "assesses the muscles, joints, and bones for any abnormalities or range of motion issues"
        },
        {
          "name": "Dermatological examination",
          "type": "physical",
          "description": "checks the skin for rashes, lesions, or other dermatological conditions"
        },
        {
          "name": "Eye examination",
          "type": "physical",
          "description": "evaluates the eyes for visual acuity, eye movements, and signs of eye diseases"
        },
        {
          "name": "Ear examination",
          "type": "physical",
          "description": "checks the ears for any abnormalities, infections, or hearing issues"
        },
        {
          "name": "Throat examination",
          "type": "physical",
          "description": "examines the throat and tonsils for signs of infection or abnormalities"
        },
        {
          "name": "Lymph node examination",
          "type": "physical",
          "description": "checks the lymph nodes for any enlargement or tenderness"
        },
        {
          "name": "Breast examination",
          "type": "physical",
          "description": "assesses the breasts for any lumps, masses, or abnormalities"
        },
        {
          "name": "Pelvic examination",
          "type": "physical",
          "description": "examines the pelvic organs in females and assesses for any abnormalities"
        },
        {
          "name": "Genital examination",
          "type": "physical",
          "description": "evaluates the male genitalia for any abnormalities or signs of disease"
        },
        {
          "name": "Rectal examination",
          "type": "physical",
          "description": "checks the rectum and anus for any abnormalities or signs of disease"
        },
        {
          "name": "Back examination",
          "type": "physical",
          "description": "evaluates the back for any deformities, tenderness, or range of motion issues"
        },
        {
          "name": "Joint examination",
          "type": "physical",
          "description": "assesses the individual joints for any swelling, tenderness, or limited range of motion"
        },
        {
          "name": "Gait and balance assessment",
          "type": "physical",
          "description": "evaluates the patient's walking pattern and balance abilities"
        },
        {
          "name": "Cognitive assessment",
          "type": "physical",
          "description": "tests the patient's cognitive function, memory, and mental status"
        },
        {
          "name": "Emotional well-being assessment",
          "type": "physical",
          "description": "evaluates the patient's emotional state, mood, and overall well-being"
        },
        {
          "name": "Nutritional assessment",
          "type": "physical",
          "description": "assesses the patient's nutritional status and dietary habits"
        },
        {
          "name": "Oral examination",
          "type": "physical",
          "description": "checks the oral cavity, teeth, and gums for any issues or abnormalities"
        },
        {
          "name": "Genetic screening",
          "type": "physical",
          "description": "screens for genetic disorders or inherited conditions"
        },
        {
          "name": "Weight and body composition assessment",
          "type": "physical",
          "description": "measures the patient's weight and body composition, such as body fat percentage"
        },
        {
          "name": "Height measurement",
          "type": "physical",
          "description": "measures the patient's height using a height scale or measuring tape"
        },
        {
          "name": "Blood pressure measurement",
          "type": "physical",
          "description": "checks the patient's blood pressure using a sphygmomanometer"
        },
        {
          "name": "Heart rate assessment",
          "type": "physical",
          "description": "measures the patient's heart rate using a stethoscope or pulse oximeter"
        },
        {
          "name": "Respiratory rate assessment",
          "type": "physical",
          "description": "counts the patient's breaths per minute to determine the respiratory rate"
        },
        {
          "name": "Temperature measurement",
          "type": "physical",
          "description": "checks the patient's body temperature using a thermometer"
        }
      ]
    })

    await prisma.user.create({
      data: [
        {
          firstName: "Patient",
          lastName: "Two",
          sex: "F",
          nationalId: "12345678901",
          id: "P2",
          email: "patient2@gmail.com",
          emailVerified: "2022-04-07T21:05:53.424Z",
          password: "await hashPassword(\"password123\")",
          role: "PATIENT",

          patient: { create: { insuranceId: "234567890" } }
        },
        {
          firstName: "Patient",
          lastName: "Three",
          sex: "M",
          nationalId: "23456789012",
          id: "P3",
          email: "patient3@gmail.com",
          emailVerified: "2022-04-07T21:05:53.424Z",
          password: "await hashPassword(\"password123\")",
          role: "PATIENT",
          patient: { create: { insuranceId: "345678901" } }
        },
        // ... continue with the remaining 37 patients
        {
          firstName: "Patient",
          lastName: "Forty",
          sex: "F",
          nationalId: "56789012345",
          id: "P40",
          email: "patient40@gmail.com",
          emailVerified: "2022-04-07T21:05:53.424Z",
          password: "await hashPassword(\"password123\")",
          role: "PATIENT",
          patient: { create: { insuranceId: "678901234" } }
        }
      ]

    })

  }
  catch (error) {
    console.error(error);
  }
  finally {
    await prisma.$disconnect();
  }
}



seed();