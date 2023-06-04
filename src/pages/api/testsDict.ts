import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/apiAuth/[...nextauth]";
import { Role } from "@prisma/client";

interface JSONClause {
    [key: string]: any;
}

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
            if (session.user?.role == Role.DOCTOR) {
                const results = await prisma.examinationDictionary.findMany({
                })

                return res.status(200).json({ success: true, data: results });
            }
            return res
                .status(401)
                .json({ success: false, message: "You are not authorized to perform this action" });
        }
        catch (error) {
            console.log(error);
        }
    }

    return res
        .status(400)
        .json({ success: false, message: "Invalid request method" });

}

