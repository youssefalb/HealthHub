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
            const { patient , visit} = req.query;
            let results: string | any[];
            if (patient) { // user is doctor or or reciptionist or admin
                if (session.user?.role == Role.DOCTOR || session.user?.role == Role.RECEPTIONIST || session.user?.role == Role.ADMIN) {
                    accessGranted = true;
                    results = await prisma.laboratoryExamination.findMany({
                        where: {
                            visit: { patientId: patient.toString() }
                        },
                    });
                    if (!results.length) throw "no data";
                    return res.status(200).json({ success: true, data: results });
                }
            }
            else if (visit) {
                if (session.user?.role == Role.PATIENT) {
                    results = await prisma.laboratoryExamination.findMany({
                        where: {
                            visitId: visit.toString(),
                            visit: { patientId: session.user?.id },
                        }
                    });
                    if (!results.length) throw "no data";
                    return res.status(200).json({ success: true, data: results });
                }

            }

            else { //no params passed, logged in user should be the patient
                if (session.user?.role == Role.PATIENT) {
                    results = await prisma.laboratoryExamination.findMany({
                        where: {
                            visit: { patientId: session.user?.id },
                            status: LaboratoryTestStatus.APPROVED
                        }
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

    else {
        return res
            .status(400)
            .json({ success: false, message: "Invalid request method" });
    }
}
