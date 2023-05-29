import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (session.user?.role != Role.ADMIN) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because you are not an admin" });
    }
    if (req.method === "GET") {
        try {
            const role = req.query.role;
            if (role === Role.PATIENT) {
                const patients = await prisma.patient.findMany(
                    {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    id: true,
                                },
                            }
                        }
                    }
                );
                return res.status(200).json({ success: true, data: patients });
            }
            else if (role === Role.DOCTOR) {
                const doctors = await prisma.doctor.findMany(
                    {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    id: true,
                                },
                            }
                        }
                    }
                );
                return res.status(200).json({ success: true, data: doctors });
            }
            else if (role === Role.RECEPTIONIST) {
                const receptionists = await prisma.receptionist.findMany(
                    {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    id: true,
                                },
                            }
                        }
                    }
                );
                return res.status(200).json({ success: true, data: receptionists });
            }
            else if (role === Role.LAB_ASSISTANT) {
                const labAssistants = await prisma.labAssistant.findMany(
                    {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    id: true,
                                },
                            }
                        }
                    });
                return res.status(200).json({ success: true, data: labAssistants });

            }
            else if (role === Role.LAB_SUPERVISOR) {
                const labSupervisors = await prisma.labSupervisor.findMany(
                    {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    id: true,
                                },
                            }
                        }
                    }
                );
                return res.status(200).json({ success: true, data: labSupervisors });
            }


        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Failed to retrieve patients" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const id = req.query.id;
            console.log(id);
            const patient = await prisma.user.delete({
                where: {
                    id: id.toString(),
                },
            });
            return res.status(200).json({ success: true, data: patient });

        }


        catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Failed to Delete patients" });
        }

    }
    return res
        .status(400)
        .json({ success: false, message: "Invalid request method" });
}