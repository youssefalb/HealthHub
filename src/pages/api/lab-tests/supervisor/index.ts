import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/apiAuth/[...nextauth]";
import { LaboratoryTestStatus, Role } from "@prisma/client";

interface JSONClause {
    [key: string]: any;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions); //authenticate user on the server side

    let accessGranted = false;

    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });

    if (req.method === "GET") {
        try {
            const { supervisor } = req.query;
            let results: string | any[];
            if (supervisor) { // user is admin or reciptionist 
                if (session.user?.role == Role.RECEPTIONIST || session.user?.role == Role.ADMIN) {
                    accessGranted = true;
                    results = await prisma.laboratoryExamination.findMany({
                        where: {
                            labSupervisor: { employeeId: supervisor.toString() }
                        },
                        include:{examinationDictionary:true}
                    });
                    if (!results.length) throw "no data";
                    return res.status(200).json({ success: true, data: results });
                }
            }
            else { //no params passed, logged in user should be the supervisor
                if (session.user?.role == Role.LAB_SUPERVISOR) {
                    results = await prisma.laboratoryExamination.findMany({
                        where: {
                            status: LaboratoryTestStatus.COMPLETED
                        },
                        include:{examinationDictionary:true}
                    });
                    if (!results.length) throw "no data";
                    return res.status(200).json({ success: true, data: results });
                }
            }

        } catch (error) {
            if (error == "no data") {
                return res
                    .status(404)
                    .json({ success: false, message: "No data found" });
            }
            return res
                .status(500)
                .json({ success: false, message: "ERROR : Failed to retrieve data" });
        }
        if (!accessGranted) {
            return res
                .status(401)
                .json({ success: false, message: "You are not authorized to perform this action" });
        }
    }

    else if (req.method == "POST") {
        if (session.user?.role == Role.LAB_SUPERVISOR) {
            accessGranted = true
            try {
                const { supervisorNote, testId } = req.body;
                //Get existing completed test
                const oldTest = await prisma.laboratoryExamination.findUnique({
                    where: {
                        testId: testId,
                    }
                })
                //create new one with same data + supervisorNote
                const result = await prisma.laboratoryExamination.create({
                    data: {
                        supervisorNote: supervisorNote,
                        doctorNote: oldTest.doctorNote,
                        visit: { connect: { visitId: oldTest.visitId } },
                        examinationDictionary: { connect: { code: oldTest.dictionaryCode } },
                    },
                });
                return res.status(200).json({ success: true, data: result });
            } catch (error) {
                return res
                    .status(500)
                    .json({ success: false, message: "ERROR : Failed to create test" });
            }
        }
        if (!accessGranted) {
            return res
                .status(401)
                .json({ success: false, message: "You are not authorized to perform this action" });
        }
    }

    else {
        return res
            .status(400)
            .json({ success: false, message: "Invalid request method" });
    }
}
