import { userInfoPath } from "./apiPaths"

export async function getUserInfo(){
    const result = await fetch(userInfoPath)
    return result
}
