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
            else if (role === "PERSONNEL") {
                const personnel = await prisma.user.findMany(
                    {
                        where: {
                            patient: null,
                            role: {
                                not: Role.ADMIN
                            }
                        }
                    }
                );
                return res.status(200).json({ success: true, data: personnel });
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
    else if (req.method === "POST") {
        try {
            const { firstName, lastName, email, role } = req.body;
            if (role === Role.PATIENT) {
                const patient = await prisma.patient.create({
                    data: {
                        user: {
                            create: {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                            
                                role: role,
                            }
                        }
                    },
                });

                return res.status(200).json({ success: true, data: patient });
            }

            const user = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    role: role,
                },
            });
            return res.status(200).json({ success: true, data: user });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Failed to create user" });
        }

    }	
    return res
        .status(400)
        .json({ success: false, message: "Invalid request method" });
}
