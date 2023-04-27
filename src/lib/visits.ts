import { Status } from "@prisma/client";
import { visitsPath } from "./apiPaths";


export async function getVisits() {
    const result = await fetch(`${visitsPath}`, {
      method: "GET",
    });
    return result;
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

//change visit date
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


