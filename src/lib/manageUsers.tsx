//get all the patients from the admin api

import { adminPath } from "./apiPaths"


export async function getPatients() {
    const result = await fetch(`${adminPath}?role=PATIENT` , {
        method: "GET",
    })
    return result.json()
}

//get all the doctors from the admin api
export async function getDoctors() {
    const result = await fetch(`${adminPath}?role=DOCTOR` , {
        method: "GET",
    })
    return result.json()
}

//get all the receptionists from the admin api
export async function getReceptionists() {

    const result = await fetch(`${adminPath}?role=RECEPTIONIST` , {
        method: "GET",
    })
    return result.json()
}

//get all the lab supervisors from the admin api
export async function getLabSupervisors() {
    const result = await fetch(`${adminPath}?role=LAB_SUPERVISOR` , {
        method: "GET",
    })
    return result.json()
}

//get all the lab assistans from the admin api
export async function getLabTechnicians() {
    const result = await fetch(`${adminPath}?role=LAB_ASSISTANT` , {
        method: "GET",
    })
    return result.json()
}

