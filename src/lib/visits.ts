import { Status, Role } from "@prisma/client";
import { doctorVisitsPath, patientVisitsPath } from "./apiPaths";

//ToDO : 
/*
  1- recheck working ones
  2- use them 
  3- 
*/

/**
 * Fetches the visits associated with a given role.
 * @async
 * @function
 * @param {Role} role - The role of the user.
 * @returns {Promise} The result of the fetch call.
 */
export async function getOwnVisits(role: Role) { //working
  let result
  if (role == Role.DOCTOR) {
    result = await fetch(`${doctorVisitsPath}`), {
      method: "GET",
    }
  }
  else if (role == Role.PATIENT) {
    result = await fetch(`${patientVisitsPath}`), {
      method: "GET",
    }
  }
  else {
    result.status(401)
      .json({ success: false, message: "you are not an authorized person" });
  }
    return result;
}

export async function getDoctorVisits() {

}


//get a specific visit
export async function getVisit(visit_id: String) {
  const result = await fetch(`${visitsPath}/${visit_id}`, {
    method: "GET",
  });
  return result;
}

export async function addVisit(doctor_id: any, patient_id?: any) {
  const result = await fetch(`${visitsPath}`, {
    method: "POST",
    body: JSON.stringify({
      description: "",
      date: new Date(), //ToDo : date picker in page
      doctor_id: doctor_id,
      patient_id: patient_id,
      receptionist_id: "",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
}

//cancel visit
export async function cancelVisit(visit_id: String) {
  const result = await fetch(`${visitsPath}/${visit_id}`, {
    method: "PUT",
     body: JSON.stringify({
      newStatus : Status.CANCELLED
    })
  });
  return result;
}

//change visit date by patient or registrar
export async function updateVisit(visit_id: String, doctor_id: String = undefined, date = undefined) {
  const result = await fetch(`${visitsPath}/${visit_id}`, {
    method: "PUT",
    body: JSON.stringify({
      newDoctor_id: doctor_id,
      newDate: date,
    })
  });
  return result;
}


