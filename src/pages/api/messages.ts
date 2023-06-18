import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/apiAuth/[...nextauth]";
import { Role  } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions); //authenticate user on the server side

    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });

    //For patient and doctor
    if (req.method === "GET") {
        try {
            let results: string | any[];
                if (session.user?.role == Role.DOCTOR) {
                    results = await prisma.message.findMany({
                        where: {
                            doctorId: session.user?.id,
                        },
                        include: { //because we want doctor name
                            doctor: {
                                select: {
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
                        orderBy: [{ dateCreated: "asc" },]
                    });
                }
                else if (session.user?.role == Role.PATIENT) {
                    results = await prisma.message.findMany({
                        where: {
                            patientId: session.user?.id,
                        },
                        include: { //because we want doctor name
                            doctor: {
                                select: {
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
                        orderBy: [{ dateCreated: "asc" },]
                    });
                }
                if(!results.length) throw "no data";
                return res.status(200).json({ success: true, data: results });
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
    }

    if (req.method === "POST") {
        if (session.user?.role === Role.DOCTOR) {
            try {
                let { patientId, content } = req.body;
                const results = await prisma.message.create({
                    data: {
                        content: content,
                        doctor: { connect: { employeeId: session.user.doctorId } },
                        patient: { connect: { patientId: patientId } },
                    },
                });
                return res.status(201).json({
                    success: true,
                    message: "Message created successfully by patient",
                    data: results,
                });
            } catch (error) {
                if (error == "no data") {
                    return res
                        .status(404)
                        .json({ success: false, message: "No data found" });
                }
                return res
                    .status(500)
                    .json({ success: false, message: "Failed to create visit" });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: "only doctor can create messages",
            });
        }
    }

    else {
        return res
            .status(400)
            .json({ success: false, message: "Invalid request method" });
    }
}
