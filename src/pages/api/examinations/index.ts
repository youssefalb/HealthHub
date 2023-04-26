import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { Role, Status } from "@prisma/client";

interface JSONClause {
    [key: string]: any;
}

//here we handle all visits-related api calls
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });

    if (req.method === "POST") {
        //Doctor creating a phyhsical examination

        if (session.user?.role === Role.DOCTOR) {
            try {
                const { visitId, exam_code } = req.body;
                const results = await prisma.physicalExamination.create({
                    data: {
                        visit: { connect: { visit_id: visitId } },
                        examinationDictionary: { connect: { code: exam_code } },
                    },
                });
                return res.status(201).json({
                    success: true,
                    message: "Physical examination created successfully by doctor",
                    data: results,
                });
            } catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ success: false, message: "Failed to create Physical examination" });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: "Only doctors can add pyhsical examinations",
            });
        }
    }


    // Patient, Doctor or Registrar viewing visits
    else if (req.method === "GET") {
        console.log("not here")
        try {
            let results: string | any[];
            if (session.user.role == Role.PATIENT  || session.user.role == Role.DOCTOR || session.user.role == Role.RECEPTIONIST) {
                const {visit_id} = req.query;
                let whereClause: JSONClause = {};
                whereClause.visit_id = Number(visit_id);
                results = await prisma.physicalExamination.findMany({
                    where: whereClause,
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Only patients, doctors and receptionists can view physical examinations",
                });
            }
            return res.status(200).json({ success: true, data: results });
        } catch (error) {
            //here should be a redirect to a general purpose error page
            return res
                .status(500)
                .json({ success: false, message: "Failed to retrieve Physical examinations" });
        }
    } else {
        return res
            .status(400)
            .json({ success: false, message: "Invalid request method" });
    }
}
