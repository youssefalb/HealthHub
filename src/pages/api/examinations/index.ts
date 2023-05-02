import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { Role, Status } from "@prisma/client";
// Everthing but not cancelled
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
                const { visit_id, exam_code } = req.body;
                const results = await prisma.physicalExamination.create({
                    data: {
                        visit: { connect: { visitId: visit_id } },
                        examinationDictionary: { connect: { code: Number(exam_code) } },
                    },
                });
                return res.status(201).json({
                    success: true,
                    message: "Physical examination created successfully by doctor",
                    data: results,
                });
            } catch (error) {
                //console.log(error);
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
        try {
            let results: string | any[];
            if (session.user.role == Role.PATIENT  ) {
                results = await prisma.physicalExamination.findMany({
                    where:{
                        visit:{
                            patientId:session.user.id
                        }
                    }
                });
            }
            else if (session.user.role == Role.RECEPTIONIST){
                results = await prisma.physicalExamination.findMany({
                });
            } 
            else if (session.user.role == Role.DOCTOR){

                results = await prisma.physicalExamination.findMany({
                    where: {
                        visit: {
                            doctorId: session.user.id
                        }
                    },
                });
                
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "Only patients, doctors and receptionists can view physical examinations",
                });
            }
            if (results){
            return res.status(200).json({ success: true, data: results });
            }
            else {
                return res.status(404).json({ success: false, message: "No physical examinations found" });
            }
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
