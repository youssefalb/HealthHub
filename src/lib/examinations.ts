
import { NextApiResponse } from 'next';
//here examinations funcpatient_id: any, doctor_id: anytions like visits
import { Role, Status } from "@prisma/client";
import { doctorExaminationsPath, patientExaminationsPath } from "./apiPaths";
import { NextResponse } from 'next/server';
import { ServerResponse } from 'http';


let jsonHeader = {
  'Content-Type': 'application/json'
}

/**
 * Retrieves the examinations owned by the user with the given role.
 * @async
 * @param {Role} role - The role of the user.
 * @returns {Promise<Response>} The fetch response object containing the examinations.
 * @returns {"unauthorized"}  if the user is not a doctor nor a patient
 */
export async function getOwnExaminations(role: Role): Promise<Response> {
  let result;
  if (role == Role.DOCTOR) {
    result = await fetch(`${doctorExaminationsPath}`, {
      method: "GET",
    })
  }
  else if (role == Role.PATIENT) {
    result = await fetch(`${patientExaminationsPath}`, {
      method: "GET",
    })
  }
  else {
    result.status(401)
      .json({ success: false, message: "you are not an authorized person" });
  }
  return result;
}

/**
 * Retrieves all examinations associated with a specific doctor.
 * consumed only by doctor.
 * @async
 * @param {String} doctorId - The ID of the doctor to retrieve examinations for.
 * @return {Promise} A Promise that resolves with the fetched data.
 */
export async function getDoctorExaminations(doctorId: String) {
  let result;
  result = await fetch(`${doctorExaminationsPath}?doctor=${doctorId}`, {
    method: "GET",
  });

  return result;
}

/**
 * Retrieves examinations for a patient with the given patientId.
 * consumed only by doctor and patient.
 * @async
 * @param {String} patientId - The ID of the patient to retrieve examinations for.
 * @return {Promise<Response>} A Promise that resolves with a Response object representing the result of the HTTP GET request.
 */
export async function getPatientExaminations(patientId: String) {
  let result;
  result = await fetch(`${patientExaminationsPath}?patient=${patientId}`, {
    method: "GET",
  });

  return result;
}

/**
 * Retrieves examination details based on the user's role.
 * consumed only by doctor and patient.
 * @async
 * @param {Role} role - The user's role (doctor or patient)
 * @param {string} examId - The ID of the examination to retrieve
 * @return {Promise<Response>} A Promise that resolves with the examination details or rejects with an error message.
 */
export async function getExaminationDetails(role: Role, examId: String) {
  let result;
  if (role == Role.DOCTOR) {
    result = await fetch(`${doctorExaminationsPath}/${examId}`, {
      method: "GET",
    })
  }
  else if (role == Role.PATIENT) {
    result = await fetch(`${patientExaminationsPath}/${examId}`, {
      method: "GET",
    })
  }
  else {
    result.status(401)
      .json({ success: false, message: "you are not an authorized person" });
  }
  return result;
}

/**
 * Creates a new examination for the given visit ID and dictionary code.
 * consumed only by a doctor.
 * @async
 * @function createExamination
 * @param {String} visitId - The ID of the visit to associate the examination with.
 * @param {number} dictionaryCode - The code for the type of examination to create.
 * @returns {Promise} A Promise that resolves with the result of the POST request to create the examination.
 */
export async function createExamination(visitId: String, dictionaryCode: number, note: string) {
  let result;
  result = await fetch(`${doctorExaminationsPath}`, {
    method: "POST",
    headers: jsonHeader,
    body: JSON.stringify({
      visitId: visitId,
      dictionaryCode: dictionaryCode,
      doctorNote : note
    })
  });
  return result;
}