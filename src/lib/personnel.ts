// here personnel functions like visits

import { personnelPath } from './apiPaths'


export async function getDoctorsInSpeciality(speciality: String) {
    const result = await fetch(`${personnelPath}?speciality=${speciality}`, {
        method: "GET",
    })
    return result.json()
}

