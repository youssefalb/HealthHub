import { Specializations } from '@prisma/client'
import { doctorVisitsPath } from './apiPaths'

export function getSpecializationList() {
    //return an array of values of Specilaization
    return Object.values(Specializations)
}

// 9-5 , 30 min

//function that returns free days in the current month of a doctor
// give doctor_id, return array of days that he has free slots 
// 1. get all the days in the current month
// 2. get all the slots of the doctor
// 3. filter the slots by day
// 4. return the days that have some free slots

export async function getAvailableAppointments(doctorId: String) {
    const visits = await fetch(`${doctorVisitsPath}?doctor=${doctorId}`, {
        method: "GET",
    })
    if (visits.status === 200) {
        const data = await visits.json()
        const slots = data.data.map((visit: any) => visit.date)
        
    }
}



