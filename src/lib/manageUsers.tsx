//get all the patients from the admin api

import { adminPath, adminUsersPath } from "./apiPaths"


let jsonHeader = {
    'Content-Type': 'application/json'
}
export async function getPatients() {
    const result = await fetch(`${adminPath}?role=PATIENT`, {
        method: "GET",
    })
    return result.json()
}

//get all the personnel
export async function getPersonnel() {
    const result = await fetch(`${adminPath}?&role=PERSONNEL`, {
        method: "GET",
    })
    return result.json()
}

export async function banUser(id: string) {
    const result = await fetch(`${adminPath}?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: false }),
    });
    return result.json();
}

// unban user based on the id
export async function unbanUser(id: string) {
    const result = await fetch(`${adminPath}?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: true }),
    });
    return result.json();
}

export async function getUserInfoWithId(userId) {
    const result = await fetch(`${adminUsersPath}/${userId}`, {
        method: 'GET',
    })
    return result
}


export async function updateUserInfo(userData, userId) {
    const result = await fetch(`${adminUsersPath}/${userId}`, {
        method: 'PUT',
        headers: jsonHeader,
        body: JSON.stringify(userData)
    })

    return result;
}
