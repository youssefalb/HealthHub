import { Role } from "@prisma/client";

export async function getVisits(role: Role, id: String) {
    const path = "/api/visits"

    const result = await fetch(`${path}?id=${id}&role=${role}`, {
        method: "GET",
    })

    return result
}


