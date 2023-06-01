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

    if (session?.user?.role != Role.ADMIN) {
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
                                    nationalId: true,
                                    isActive: true
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
                                    nationalId: true,
                                    isActive: true
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
                                    nationalId: true,
                                    isActive: true
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
                                    nationalId: true,
                                    isActive: true

                                },
                            }
                        }
                    });
                return res.status(200).json({ success: true, data: labAssistants });

            }
            else if (role === Role.LAB_SUPERVISOR) {
                console.log("went to super EP")
                const labSupervisors = await prisma.labSupervisor.findMany(
                    {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                    id: true,
                                    nationalId: true,
                                    isActive: true
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
    else if (req.method === "PUT") {
        try {
            const id = req.query.id;
            const { isActive } = req.body;
            const user = await prisma.user.update({
                where: {
                    id: id.toString(),
                },
                data: {
                    isActive: isActive,
                },
            });
            return res.status(200).json({ success: true, data: user });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Failed to ban or unban users" });
        }

    }
    return res
        .status(400)
        .json({ success: false, message: "Invalid request method" });
}
