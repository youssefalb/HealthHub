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
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized because not logged in" });
        }

        if (req.method === "GET") {
            const result = await prisma.user.findUnique({
                where: { id: session.user.id },
                include: {
                    patient: {
                        select: { insuranceId: true },
                    },
                },
            });

            return res.status(200).json({ success: true, data: result });
        } else if (req.method === "PUT") {
            const {
                firstName,
                lastName,
                image,
                insuranceId,
                nationalId,
                email,
                newPassword,
                oldPassword,
            } = req.body;

            if (email) {
                const existingUser = await prisma.user.findUnique({
                    where: { email },
                });

                if (existingUser) {
                    return res
                        .status(401)
                        .json({ success: false, message: "Email already in use" });
                }

                const result = await prisma.user.update({
                    where: { id: session.user.id.toString() },
                    data: { email, emailVerified: null },
                });

                await sendVerificationEmail(result);
                return res.status(200).json({ success: true, data: result });
            } else if (newPassword && oldPassword) {
                const { password: currentHashedPassword } = await prisma.user.findUnique(
                    {
                        where: { id: session.user.id.toString() },
                        select: { password: true },
                    }
                );

                const hashedPassword = await hashPassword(newPassword);
                const isPasswordCorrect = await comparePassword(
                    oldPassword,
                    currentHashedPassword
                );

                if (!isPasswordCorrect) {
                    return res
                        .status(401)
                        .json({ success: false, message: "Wrong password" });
                }

                if (newPassword === oldPassword) {
                    return res.status(401).json({
                        success: false,
                        message: "New password cannot be the same as the old one",
                    });
                }

                const result = await prisma.user.update({
                    where: { id: session.user.id.toString() },
                    data: { password: hashedPassword },
                });

                return res.status(200).json({ success: true, data: result });
            } else if (insuranceId) {
                console.log(insuranceId);
                const result = await prisma.patient.update({
                    where: { patientId: session.user.id.toString() },
                    data: { insuranceId: insuranceId},
                });
                console.log(result);
                return res.status(200).json({ success: true, data: result });
            }
            console.log("here");
            const dataClause = {
                firstName,
                lastName,
                image,
                nationalId,
            };
            console.log("Data", dataClause);

            const result = await prisma.user.update({
                where: { id: session.user.id.toString() },
                data: dataClause,
            });

            return res.status(200).json({ success: true, data: result });
        }

        return res
            .status(400)
            .json({ success: false, message: "Invalid request method" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "ERROR: Failed to retrieve data" });
    }
}
