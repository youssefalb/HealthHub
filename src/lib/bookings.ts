import { Specializations } from '@prisma/client'

export function getSpecializationList() {
    //return an array of values of Specilaization
    return Object.values(Specializations)
    
}


