//here examinations funcpatient_id: any, doctor_id: anytions like visits
import { Status } from "@prisma/client";
import { examinationsPath } from "./apiPaths";

export async function getExaminations() {
    const result = await fetch(`${examinationsPath}`, {
      method: "GET",
    });
    return result;
}

export async function getExamination(exam_id: String) {
  const result = await fetch(`${examinationsPath}/${exam_id}`, {
    method: "GET",
  });
  return result;
}

export async function addExamination() {
  const result = await fetch(`${examinationsPath}`, {
    method: "POST",
  //   body: JSON.stringify({
  //     description: "",
  //     date: new Date(), //ToDo : date picker in page
  //     doctor_id: doctor_id,
  //     patient_id: patient_id,
  //     receptionist_id: "",
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  });
  return result;
}

export async function cancelExam(exam_id: String) {
  const result = await fetch(`${examinationsPath}/${exam_id}`, {
    method: "PUT",
    //  body: JSON.stringify({
    //   newStatus : Status.CANCELLED
    // })
  });
  return result;
}

export async function updateExam(exam_id: String) {
  const result = await fetch(`${examinationsPath}/${exam_id}`, {
    method: "PUT",
    // body: JSON.stringify({
    //   newDoctor_id: doctor_id,
    //   newDate: date,
    // })
  });
  return result;
}
