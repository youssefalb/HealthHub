import { Status, Role } from "@prisma/client";
import { doctorVisitsPath, patientVisitsPath, visitsIdPath } from "./apiPaths";

let jsonHeader =  {
  'Content-Type': 'application/json'
    }

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

/**
 * Async function that retrieves doctor visits based on doctor ID.
 * if the requesting user is patient it returns only dates of visits.
 * if the requesting user is receptionist or admin it returns all details
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
 * used only by receptionist or an admin.
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
 * @param {Role} role - The role of the user making the request.
 * @param {String} visitId - The ID of the visit to retrieve.
 * @returns {Promise} - Returns a Promise that resolves with the result of the fetch request.
 */
export async function getVisitDetails(role: Role, visitId: String): Promise<Response> {
  let result
  if (role == Role.DOCTOR) {
    result = await fetch(`${doctorVisitsPath}/${visitId}`, {
      method: "GET",
    })
  }
  else if (role == Role.PATIENT) {
    result = await fetch(`http://localhost:3000${patientVisitsPath}/${visitId}`, {
      method: "GET",
    })
  }

  return result;
}

export async function getAllVisitsIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch(`http://localhost:3000${visitsIdPath}`, {method: 'GET'});
  let visits = await res.json();
  visits = visits.data
  console.log(visits)
  return visits.map((visit) => {
    return {
      params: {
        id: visit.visitId,
      },
    };
  });
}

/**
 * Creates a new visit for the given patient with the provided speciality, doctor ID, and date.
 * @param speciality The speciality of the doctor the patient is visiting.
 * @param doctorId The ID of the doctor the patient is visiting.
 * @param date The date of the visit.
 * @returns {Promise<Response>} A Promise that resolves to the result of the POST request to create the visit.
 */
export async function createVisitByPatient(note: String, doctorId: String, date: String): Promise<Response> {
  const result = await fetch(`${patientVisitsPath}`, {
    method: "POST",
    headers: jsonHeader,
    body: JSON.stringify({
      "description": note,
      "doctorId": doctorId,
      "date": date,
    }),
  });
  return result;
}

/**
 * Creates a new visit by receptionist for the given patientId, speciality, doctorId, and date.
 * @param {String} patientId - The ID of the patient for whom the visit is being created.
 * @param {String} speciality - The speciality of the doctor for whom the visit is being created.
 * @param {String} doctorId - The ID of the doctor for whom the visit is being created.
 * @param {String} date - The date of the visit for which the visit is being created.
 * @returns {Promise<Response>} A Promise that resolves to the result of the POST request.
 */
export async function createVisitByReceptionist(patientId: String, speciality: String, doctorId: String, date: String): Promise<Response> {
  const result = await fetch(`${patientVisitsPath}`, {
    method: "POST",
    headers: jsonHeader,
    body: JSON.stringify({
      patientId: patientId,
      description: speciality,
      doctorId: doctorId,
      date: date,
    }),
  });
  return result;
}

//by patient and recep to change status 
/**
 * Cancel a visit by changing its status to cancelled.
 * @param {String} visitId - The ID of the visit to be cancelled.
 * @returns {Promise} - A Promise that resolves with the result of the PUT request.
 */
export async function cancelVisit(visitId: String): Promise<Response> {
  //put request to change status of the visit
  const result = await fetch(`${patientVisitsPath}/${visitId}`, {
    method: "PUT",
    body: JSON.stringify({
      status: Status.CANCELLED
    })
  });
  return result;

}

//by recep and patient, to change date 
/**
 * Update the visit date for a patient by ID.
 * @param {String} visitId - The ID of the visit to update.
 * @param {String} date - The new date for the visit.
 * @returns {Promise<Response>} - A promise that resolves with the response from the server.
 */
export async function changeVisitDate(visitId: String, date: String): Promise<Response> {
  const result = await fetch(`${patientVisitsPath}/${visitId}`, {
    method: "PUT",
    body: JSON.stringify({
      date: date
    })
  });
  return result;
}

//by recep only, to change doctor
/**
 * Changes the doctor assigned to a patient visit by sending a PUT request to the server
 * @param {String} visitId - The ID of the visit to change the doctor for
 * @param {String} doctorId - The ID of the new doctor to assign to the visit
 * @returns {Promise<Response>} - A Promise that resolves to the result of the PUT request
 */
export async function changeVisitDoctor(visitId: String, doctorId: String): Promise<Response> {
  const result = await fetch(`${patientVisitsPath}/${visitId}`, {
    method: "PUT",
    body: JSON.stringify({
      doctorId: doctorId
    })
  });
  return result;
}

/**
 * Updates the visit details for the given visit ID with the provided parameters.
 * Consumed only by doctor to change status, diagnosis, dateRealized. 
 * @param {string} visitId - The ID of the visit to update.
 * @param {any} params - The parameters to update the visit with.
 * @returns {Promise<Response>} - A Promise that resolves to the updated visit details.
 */
export async function changeVisitDetails(visitId: String, ...params: any): Promise<Response> {
  const result = await fetch(`${patientVisitsPath}/${visitId}`, {
    method: "PUT",
    body: JSON.stringify({
      status: params.status,
      diagnosis: params.diagnosis,
    })
  });
  return result;
}
