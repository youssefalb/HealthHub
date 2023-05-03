//post should be done by
//Doctor supervisor

// Get all lab tests (Patient, Doctor, Supervisor)
// Registrar can use Doctor and patient EPs
// Doctor can use patient EP
// technincian gets only ordered, in Progress
// Doctor sees everything
// Patient sees only his tests

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";
import { Role, Status } from "@prisma/client";

interface JSONClause {
    [key: string]: any;
}

//here we handle all visits-related api calls
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions); //authenticate user on the server side
    //console.log(session.user?.role)
    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });

    else if (req.method === "GET") {

        try {
            const { patient_id } = req.query;
            let results: string | any[];
            if (patient_id) {
                if (session.user?.role == Role.DOCTOR || session.user?.role == Role.RECEPTIONIST) {
                    results = await prisma.laboratoryExamination.findMany({
                        where: {
                            visit: { patientId: patient_id.toString()}
                        },
                    });
                }
                else {
                    return res
                        .status(401)
                        .json({ success: false, message: "You can see this patient's data" });
                }

            }
            else {

                if (session.user?.role == Role.PATIENT) {
                results = await prisma.laboratoryExamination.findMany({
                    where: {
                        visit: { patientId: session.user?.id }
                    },
                });
            }
            return res.status(200).json({ success: true, data: results });

            }
            
        } catch (error) {
            //here should be a redirect to a general purpose error page
            return res
                .status(500)
                .json({ success: false, message: "Failed to retrieve data" });
        }
    } else {
        return res
            .status(400)
            .json({ success: false, message: "Invalid request method" });
    }
}
