import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/apiAuth/[...nextauth]";
import { Role } from "@prisma/client";
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import { comparePassword, hashPassword } from "@/lib/hashPassword";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions); //authenticate user on the server side

    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });

    if (req.method === "GET") {
        try {
            const result = await prisma.user.findUnique({
                where: { id: session.user.id },
                include: {
                    patient: {
                        select: { insuranceId: true }
                    }
                }
            })
            return res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "ERROR : Failed to retrieve data" });
        }
    }
    else if (req.method == "PUT") {
        if (session.user?.role == Role.PATIENT) {
            try {
                //THINGS TO CHANGE
                //TODO(drago): 'data' to be changed 
                //firstName, lastName, image, sex, nationalID(pesel), insuranceID 
                const { firstName, lastName, image, insuranceId,nationalID,  email, newPassword, oldPassword } = req.body
                if (email) {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    })
                    if (user) {
                        return res.status(401).json({ success: false, message: "Email already in use" });
                    }

                    const result = await prisma.user.update({
                        where: {
                            id: session.user.id.toString(),
                        },
                        data: {
                            email: email,
                            emailVerified: null
                        }
                    })
                    await sendVerificationEmail(result);
                    return res.status(200).json({ success: true, data: result });

                }
                else if (newPassword && oldPassword) {

                    const { password: currentHashedPassword } = await prisma.user.findUnique({
                        where: {
                            id: session.user.id.toString(),
                        },
                        select: {
                            password: true
                        }
                    })
                    const hashedPassword = await hashPassword(newPassword)
                    const isPasswordCorrect = await comparePassword(oldPassword, currentHashedPassword)
                    if (isPasswordCorrect) {
                        if (newPassword == oldPassword) {
                            return res.status(401).json({ success: false, message: "New password cannot be the same as the old one" });
                        }
                        const result = await prisma.user.update({
                            where: {
                                id: session.user.id.toString(),
                            },
                            data: {
                                password: hashedPassword
                            }
                        })
                        return res.status(200).json({ success: true, data: result });
                    }
                    else {
                        return res.status(401).json({ success: false, message: "Wrong password" });
                    }
                }

                else {
                    const dataClause = {
                        firstName,
                        lastName,
                        image,
                        insuranceId,
                        nationalID
                    };
                    const result = await prisma.user.update({
                        where: {
                            id: session.user.id.toString(),
                        },
                        data: dataClause
                    })
                    return res.status(200).json({ success: true, data: result });
                }
            } catch (error) {
                return res
                    .status(500)
                    .json({ success: false, message: "ERROR : Failed to retrieve data" });
            }
        }
    }
    return res
        .status(400)
        .json({ success: false, message: "Invalid request method" });
}
