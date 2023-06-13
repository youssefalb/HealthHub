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
    const { visit_id } = req.query
    if (req.method == "GET") {
        if (session.user?.role == Role.DOCTOR) {
            try {
                const visit = await prisma.visit.findUnique({
                    where: {
                        visitId: visit_id.toString(),
                    },
                    include: {
                        patient: {
                            include: {
                                user: true
                            }
                        }
                    }
                })
                if (visit == null) throw "no data";
                return res.status(200).json({ success: true, data: visit });
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

    if (req.method == "PUT") {
        console.log("body: ", req.body)
        if (session.user?.role == Role.DOCTOR) {
            try {
                const visit = await prisma.visit.findUnique({
                    where: {
                        visitId: visit_id.toString(),
                    },
                })
                if (visit.doctorId == session.user?.id) {
                    const currentStatus = visit.status
                    let results;
                    if (currentStatus == Status.REGISTERED) {
                        console.log("cs is reg")
                        try {
                            results = await prisma.visit.update({
                                where: {
                                    visitId: visit_id.toString(),
                                },
                                data: { ...req.body },
                            })
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
                    else if (currentStatus == Status.IN_PROGRESS) {
                        try {
                            results = await prisma.visit.update({
                                where: {
                                    visitId: visit_id.toString(),
                                },
                                data: {
                                    ...req.body,
                                    dateRealized: new Date(),
                                    diagnosis: req.body.diagnosis,
                                    description: req.body.description
                                }
                            })
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
                    else {
                        return res.status(401).json({ success: false, message: "You can't change this visit because it's in the past" });
                    }
                    return res.status(200).json({ success: true, data: results });
                }
                else {
                    return res.status(401).json({ success: false, message: "You are not authorized to change this visit, not yours" });
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
