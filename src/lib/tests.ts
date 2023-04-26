//here functions of tests, just like visits

import { testsPath } from "./apiPaths";

//function that gets all tests from database
export const getTests = async () => {
    const result = await fetch(`${testsPath}`, {
        method: "GET",
    });
    return result;
}
    