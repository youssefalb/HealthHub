import { LaboratoryTestStatus, Role, Status } from '@prisma/client';
import { doctorTestsPath, patientTestsPath, supervisorTestsPath, technicianTestsPath } from './apiPaths';
import { getVisitDetails } from './visits';

let jsonHeader = {
    'Content-Type': 'application/json'
}

//===================== GENERAL ======================

/**
 * Async function that fetches a list of tests based on the user role.
 * consumed by "Doctor", "Patient", "lab supervisor", "lab assistant"
 * @async
 * @param {Role} role - the user role, determines the endpoint to fetch from
 * @return {Promise<Response>} A Promise that resolves with a Response object
 * containing the response to the request
 */
export async function getOwnTests(role: Role): Promise<Response>{
    let path = '';
    switch (role) {
        case Role.DOCTOR:
            path = doctorTestsPath;
            break;
        case Role.PATIENT:
            path = patientTestsPath;
            break;
        case Role.LAB_SUPERVISOR:
            path = supervisorTestsPath;
            break;
        case Role.LAB_ASSISTANT:
            path = technicianTestsPath;
            break;
    }
    return await fetch(path, {
        method: 'GET',
    });
}

/**
 * Retrieves test details for a specific test ID based on the given user role.
 *
 * @param {Role} role - The user's role, which determines the API endpoint to use.
 * @param {String} testId - The ID of the test to retrieve details for.
 * @return {Promise<Response>} A promise that resolves to the API response for the requested test details.
 */
export async function getTestDetails(role: Role, testId: String): Promise<Response>{
    let path = '';
    switch (role) {
        case Role.DOCTOR:
            path = doctorTestsPath;
            break;
        case Role.PATIENT:
            path = patientTestsPath;
            break;
        case Role.LAB_SUPERVISOR:
            path = supervisorTestsPath;
            break;
        case Role.LAB_ASSISTANT:
            path = technicianTestsPath;
            break;
    }
    return await fetch(path + testId, {
        method: 'GET',
    });
}

//===================== ADMIN ======================
/**
 * Retrieves the list of tests assigned to a specific doctor.
 * consumed only by admin and receptionist.
 * @async
 * @param {String} doctorId - ID of the doctor to retrieve tests for.
 * @returns {Promise<Response>} A Promise that resolves to a Response object representing the list of tests assigned to the specified doctor.
 */
export async function getDoctorTests(doctorId: String): Promise<Response>{
    return await fetch(`${doctorTestsPath} + "?doctor=" +${doctorId}`, {
        method: 'GET',
    });
}

/**
 * Retrieves the list of tests assigned to a specific patient.
 * consumed only by Doctor, admin and receptionist.
 * @async
 * @param {String} doctorId - ID of the doctor to retrieve tests for.
 * @returns {Promise<Response>} A Promise that resolves to a Response object representing the list of tests belonging to the specified patient.
 */
export async function getPatientTests(patientId: String): Promise<Response>{
    return await fetch(`${patientTestsPath} + "?patient=" +${patientId}`, {
        method: 'GET',
    });
}

/**
 * Retrieves the list of tests assigned to a specific lab assistanr.
 * consumed only by admin and receptionist.
 * @async
 * @param {String} assistantId - ID of the doctor to retrieve tests for.
 * @returns {Promise<Response>} A Promise that resolves to a Response object representing the list of tests assigned to the specified lab assistanr.
 */
export async function getLabAssistantTests(assistantId: String): Promise<Response> {
    return await fetch(`${technicianTestsPath} + "?technician=" +${assistantId}`, {
        method: 'GET',
    });
}

/**
 * Retrieves the list of tests assigned to a specific lab supervisor.
 * consumed only by admin and receptionist.
 * @async
 * @param {String} supervisorId - ID of the doctor to retrieve tests for.
 * @returns {Promise<Response>} A Promise that resolves to a Response object representing the list of tests assigned to the specified lab supervisor.
 */
export async function getSupervisorTests(supervisorId: String): Promise<Response> {
    return await fetch(`${supervisorTestsPath} + "?supervisor=" +${supervisorId}`, {
        method: 'GET',
    });

}

//===================== DOCTOR ======================

/**
 * Sends an order for a test as a doctor.
 *
 * @async
 * @param {String} visitId - The ID of the visit.
 * @param {number} dictionaryCode - The code of the dictionary.
 * @param {String} doctorNote - The note of the doctor.
 * @returns {Promise<Response>} A Promise representing the response of the POST request.
 */
export async function orderTestAsDoctor(visitId: String, dictionaryCode: number, doctorNote: String): Promise<Response> {
    return await fetch(doctorTestsPath, {
        method: 'POST',
        headers: jsonHeader,
        body: JSON.stringify({
            visitId: visitId,
            dictionaryCode: dictionaryCode,
            doctorNote: doctorNote
        })
    });
}

//===================== LAB ASSISTANT ======================

/**
 * Starts performing the test with the given ID. Sends a PUT request to the technicianTestsPath
 * with the test ID to set its status to "in progress". 
 *
 * @param {String} testId - The ID of the test to perform.
 * @return {Promise<Response>} A Promise that resolves to a Response object representing the result
 * of the PUT request.
 */
export async function startPerformingTest(testId:String): Promise<Response> {
    const result = await fetch(`${technicianTestsPath} + "/" + ${testId}`, {
        method: 'PUT',
    });
    return result;
}

/**
 * Async function that updates the status and note of a laboratory test with the given testId.
 *
 * @param {String} testId - The ID of the laboratory test to update.
 * @param {LaboratoryTestStatus} status - The new status of the laboratory test.
 * @param {String} note - The note associated with the laboratory test.
 * @return {Promise<Response>} - A Promise that resolves with a Response object when the PUT request is complete.
 */
export async function finishPerformingTest(testId: String, status : LaboratoryTestStatus, note : String): Promise<Response> {
    const result = await fetch(`${technicianTestsPath} + "/" + ${testId}`, {
        method: 'PUT',
        headers: jsonHeader,
        body: JSON.stringify({
            status: status,
            note: note
        })
    });
    return result;
}

//===================== LAB SUPERVISOR ======================

/**
 * Approves a test with the specified ID.
 * Consumed only by a Lab Supervior
 * @param {String} testId - The ID of the test to approve.
 * @return {Promise<Response>} A promise that resolves with a Response object representing the server's response to the approval request.
 */
export async function approveTest(testId: String): Promise<Response> {
    return await fetch(`${supervisorTestsPath} +"/" + ${testId}`, {
        method: 'PUT',
        headers: jsonHeader,
        body: JSON.stringify({
            status: LaboratoryTestStatus.APPROVED,
        })
    });
}

/**
 * Sends a PUT request to the supervisor tests API to reject a laboratory test with the provided test ID. 
 * The request includes a JSON body with the "status" field set to LaboratoryTestStatus.REJECTED.
 * @async
 * @param {String} testId - The ID of the laboratory test to reject.
 * @return {Promise<Response>} A promise that resolves with the response of the PUT request.
 */
export async function rejectTest(testId: String): Promise<Response> {
    return await fetch(`${supervisorTestsPath} +"/" + ${testId}`, {
        method: 'PUT',
        headers: jsonHeader,
        body: JSON.stringify({
            status: LaboratoryTestStatus.REJECTED,
        })
    });
}

/**
 * Reorders a test as a supervisor.
 * Marks test as rejected, then orders a new one with the same details.
 * Consumed by Lab Supervisor only
 * @async
 * @param {String} testId - The ID of the test to reorder.
 * @param {String} note - The supervisor's note.
 * @returns {Promise<Response>} The response of the POST request.
 */
export async function reorderTestAsSupervisor(testId: String, note: String): Promise<Response>{
    rejectTest(testId);

    return await fetch(supervisorTestsPath, {
        method: 'POST',
        headers: jsonHeader,
        body: JSON.stringify({
            testId: testId,
            supervisorNote : note
        })
    });
}