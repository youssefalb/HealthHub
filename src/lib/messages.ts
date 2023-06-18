import { Role } from "@prisma/client";
import { messagesPath } from "./apiPaths";

let jsonHeader = {
    'Content-Type': 'application/json'
}

export async function getOwnMessages(): Promise<Response> { //working
    let response = await fetch(`${messagesPath}`, {
        method: "GET",
    })
    let result = await response.json()
    return result;
}

export async function createMessage(patientId: string, content: string,): Promise<Response> {
    const response = await fetch(`${messagesPath}`, {
        method: "POST",
        headers: jsonHeader,
        body: JSON.stringify({
            content: content,
            patientId: patientId
        }),
    });
    let result = await response.json()
    return result;
}
