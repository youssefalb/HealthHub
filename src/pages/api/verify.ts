import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
export default async function handler(req, res) {
    const token = req.query.token;

    if (!token) {
        return res.status(400).send("No token provided");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const userId = decoded.id;
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                emailVerified: new Date(),
            },
        })

        res.redirect('../auth/login?verified=true');
        console.log("Email verified");
    } catch (error) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            const provAccountId = decoded.id;
            const userId = await prisma.account.findFirst({
                where: {
                    providerAccountId: provAccountId,
                }
            })
            await prisma.user.update({
                where: {
                    id: userId.userId,
                },
                data: {
                    emailVerified: new Date(),
                },
            })

            res.redirect('../auth/login?verified=true');
            console.log("Email verified");
        }
        catch (error) {
            return res.status(401).send("Invalid or expired token");
        }
    }
}
