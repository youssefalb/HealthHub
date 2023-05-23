import { Specializations } from '@prisma/client'
import dayjs from 'dayjs';
import { doctorVisitsPath } from './apiPaths'

export function getSpecializationList() {
    //return an array of values of Specilaization
    return Object.values(Specializations)
}

// 9-5 , 15 min

//function that returns free days in the current month of a doctor
// give doctor_id, return array of days that he has free slots 
// 1. get all the days in the current month
// 2. get all the slots of the doctor
// 3. filter the slots by day
// 4. return the days that have some free slots

export async function getTakenAppointments(doctorId: String, month: number = dayjs().month() ) {
    // const visits = await fetch(`${doctorVisitsPath}?doctor=${doctorId}&month=${month}`, {
    const visits = await fetch(`${doctorVisitsPath}?doctor=${doctorId}`, {
        method: "GET",
    })
    if (visits.status === 200) {
        const data = await visits.json()
        const takenSlots = data.data.map((visit: any) => new Date(visit.date))

        return takenSlots
    }
}



