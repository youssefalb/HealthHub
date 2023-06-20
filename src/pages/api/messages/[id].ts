import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/apiAuth/[...nextauth]";
import { Role, Status } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions); //authenticate user on the server side

    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });
    const { id } = req.query
    if (req.method == "GET") {
        if (session.user?.role == Role.PATIENT) {
            try {
                const message = await prisma.message.findUnique({
                    where: {
                        messageId: id.toString(),
                    },
                    include: {
                        doctor: {
                            select: {
                                user: {
                                    select: { firstName: true, lastName: true }
                                }
                            }
                        }
                    }
                })
                if (message == null) throw "no data"
                if (message.patientId == session.user?.id) {
                    return res.status(200).json({ success: true, data: message });
                }
                else {
                    return res.status(401).json({ success: false, message: "You can't see this patient's data" });
                }
            }
            catch (error) {
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
        //return not authorized
        return res
            .status(401)
            .json({ success: false, message: "you are not an authorized person" });
    }

    return res
        .status(400)
        .json({ success: false, message: "Invalid request method" });
}
