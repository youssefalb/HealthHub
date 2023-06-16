import { receptionistPath } from "./apiPaths"

let jsonHeader = {
    'Content-Type': 'application/json'
}
export async function getPatients() {
    const result = await fetch(`${receptionistPath}?fetchKey=PATIENT`, {
        method: "GET",
    })
    return result.json()
}

export async function getVisits() {
    const result = await fetch(`${receptionistPath}?fetchKey=VISITS`, {
        method: "GET",
    })
    return result.json()
}

export async function addVisit(visit) {
    const result = await fetch(`${receptionistPath}`, {
        method: "POST",
        headers: jsonHeader,
        body: JSON.stringify(visit)
    })
    return result.json()
}