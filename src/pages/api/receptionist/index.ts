import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { hashPassword } from "@/lib/hashPassword";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.role != Role.RECEPTIONIST) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because you are not a receptionist" });
    }
    if (req.method === "GET") {
        try {
            const fetchKey = req.query.fetchKey;
            if (fetchKey === Role.PATIENT) {
                console.log("fetching patients");
                const patients = await prisma.patient.findMany(
                    {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    id: true,
                                    nationalId: true,
                                },
                            }
                        }
                    }
                );
                return res.status(200).json({ success: true, data: patients });
            }
            else if (req.query.fetchKey === "VISITS") {
                const visits = await prisma.visit.findMany(
                    {
                        include: {
                            patient: {
                                select: {
                                    user: {
                                        select: {
                                            firstName: true,
                                            lastName: true,
                                            email: true,
                                            id: true,
                                            nationalId: true,
                                        },
                                    }
                                }
                            },
                            doctor: {
                                select: {
                                    user: {
                                        select: {
                                            firstName: true,    
                                            lastName: true,
                                            email: true,
                                            id: true,
                                            nationalId: true,
                                        },
                                    }   
                                }
                            }
                        }
                    }
                );
                return res.status(200).json({ success: true, data: visits });
            }

        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Failed to retrieve Data" });
        }

    }
    return res
        .status(400)
        .json({ success: false, message: "Invalid request method" });
}
