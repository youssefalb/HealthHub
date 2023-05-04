import { useSession } from 'next-auth/react';
import { Status, Role } from "@prisma/client";
import { doctorVisitsPath, patientVisitsPath } from "./apiPaths";

//ToDO : 
/*
  1- recheck working ones
  2- use them 
  3- 
*/

/**
 * Asynchronously gets the visits of the user with the specified role.
 * @param {Role} role - The role of the user whose visits are to be retrieved.
 * @return {Promise} A Promise representing the result of the GET request to the 
 * respective endpoint for the specified role. Returns a 401 error if the role is 
 * not authorized.
 */
export async function getOwnVisits(role: Role): Promise<Response> { //working
  let result
  if (role == Role.DOCTOR) {
    result = await fetch(`${doctorVisitsPath}`, {
      method: "GET",
    })
  }
  else if (role == Role.PATIENT) {
    result = await fetch(`${patientVisitsPath}`, {
      method: "GET",
    })
  }
  else {
    result.status(401)
      .json({ success: false, message: "you are not an authorized person" });
  }
  return result;
}

//for patient it returns dates only
/**
 * Async function that retrieves doctor visits based on doctor ID.
 * @param role Role of the user making the request.
 * @param doctorId ID of the doctor to retrieve visits for.
 * @returns A Promise that resolves with the result of the GET request to the doctor visits endpoint.
 */
export async function getDoctorVisits(doctorId: String): Promise<Response> {
  let result;
  result = await fetch(`${doctorVisitsPath}?doctor=${doctorId}`, {
    method: "GET",
  });

  return result;
}

/**
 * Retrieves a list of patient visits for a given patient ID.
 * @param {Role} role - The user role.
 * @param {String} patientId - The ID of the patient.
 * @returns {Promise<Response>} A promise that resolves with the response object containing the patient visits.
 */
export async function getPatientVisits(patientId: String): Promise<Response> {
  let result;
  result = await fetch(`${patientVisitsPath}?patient=${patientId}`, {
    method: "GET",
  });
  return result;
}

/**
 * Retrieves a visit by ID based on the specified role.
 * 
 * @param {Role} role - The role of the user making the request.
 * @param {String} visitId - The ID of the visit to retrieve.
 * @returns {Promise} - Returns a Promise that resolves with the result of the fetch request.
 */
export async function getVisit(role: Role, visitId: String) {
  let result
  if (role == Role.DOCTOR) {
    result = await fetch(`${doctorVisitsPath}/${visitId}`, {
      method: "GET",
    })
  }
  else if (role == Role.PATIENT || role == Role.RECEPTIONIST) {
    result = await fetch(`${patientVisitsPath}/${visitId}`, {
      method: "GET",
    })
  }

  return result;
}

// export async function addVisit(doctor_id: any, patient_id?: any) {
//   const result = await fetch(`${visitsPath}`, {
//     method: "POST",
//     body: JSON.stringify({
//       description: "",
//       date: new Date(), //ToDo : date picker in page
//       doctor_id: doctor_id,
//       patient_id: patient_id,
//       receptionist_id: "",
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return result;
// }

// //cancel visit
// export async function cancelVisit(visit_id: String) {
//   const result = await fetch(`${visitsPath}/${visit_id}`, {
//     method: "PUT",
//     body: JSON.stringify({
//       newStatus: Status.CANCELLED
//     })
//   });
//   return result;
// }

// //change visit date by patient or registrar
// export async function updateVisit(visit_id: String, doctor_id: String = undefined, date = undefined) {
//   const result = await fetch(`${visitsPath}/${visit_id}`, {
//     method: "PUT",
//     body: JSON.stringify({
//       newDoctor_id: doctor_id,
//       newDate: date,
//     })
//   });
//   return result;
// }


