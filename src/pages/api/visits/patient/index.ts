import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/apiAuth/[...nextauth]";
import { Role, Status } from "@prisma/client";

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
            const { patient } = req.query;
            let results: string | any[];
            if (patient) { // user is doctor or or reciptionist or admin
                if (session.user?.role == Role.DOCTOR || session.user?.role == Role.RECEPTIONIST || session.user?.role == Role.ADMIN) {
                    accessGranted = true;
                    results = await prisma.visit.findMany({
                        where: {
                            patientId: patient.toString()
                        },
                        include: { //because we want doctor name
                            doctor: {
                                include: {
                                    user: {
                                        select:
                                        {
                                            firstName: true,
                                            lastName: true
                                        }
                                    }
                                }
                            }
                        },
                        orderBy: { date: "asc" }
                    });
                    if(results == null) throw "no data";
                    
                    return res.status(200).json({ success: true, data: results });
                }
            }
            else { //no params passed, logged in user should be the patient
                if (session.user?.role == Role.PATIENT) {
                    results = await prisma.visit.findMany({
                        where: {
                            patientId: session.user?.id,
                        },
                        include: { //because we want doctor name
                            doctor: {
                                include: {
                                    user: {
                                        select:
                                        {
                                            firstName: true,
                                            lastName: true
                                        }
                                    }
                                }
                            }
                        },
                        orderBy: [{ date: "asc" },]
                    });
                }
                return res.status(200).json({ success: true, data: results });
            }

        } catch (error) {
            //here should be a redirect to a general purpose error page
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

    if (req.method === "POST") {
        //Patient or Registrar creating a visit
        if (session.user?.role === Role.PATIENT || session.user?.role === Role.RECEPTIONIST) {
            try {
                let { patientId, description, doctorId, date } = req.body;
                let receptionist
                if (!patientId) {
                    patientId = session.user?.id;
                }
                else if (patientId) {
                    receptionist = { receptionist: { connect: { employeeId: session.user?.id } } }
                }
                const results = await prisma.visit.create({
                    data: {
                        description: description,
                        date: date,
                        doctor: { connect: { employeeId: doctorId } },
                        patient: { connect: { patientId: patientId } },
                        ...receptionist,
                    },
                });
                return res.status(201).json({
                    success: true,
                    message: "Visit created successfully by patient",
                    data: results,
                });
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ success: false, message: "Failed to create visit" });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: "only patients and receptionists can create appointments",
            });
        }
    }

    else {
        return res
            .status(400)
            .json({ success: false, message: "Invalid request method" });
    }
}
