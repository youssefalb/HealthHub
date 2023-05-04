import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/apiAuth/[...nextauth]";
import { LaboratoryTestStatus, Role } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions); //authenticate user on the server side

    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });
    const { test_id } = req.query
    if (req.method == "GET") {
        if (session.user?.role == Role.LAB_SUPERVISOR) {
            try {
                const test = await prisma.laboratoryExamination.findFirst({
                    where: {
                        testId: test_id.toString(),
                        status: LaboratoryTestStatus.COMPLETED,
                    },
                })
                return res.status(200).json({ success: true, data: test });
            }
            catch (error) {
                //here should be a redirect to a general purpose error page
                return res
                    .status(500)
                    .json({ success: false, message: "ERROR : Failed to retrieve data" });
            }
        }
        //return not authorized
        return res
            .status(401)
            .json({ success: false, message: "you are not a supervisor" });
    }

    if (req.method == "PUT") {
        if (session.user?.role == Role.LAB_SUPERVISOR) {
            try {
                const testInQuestion = await prisma.laboratoryExamination.findUnique({
                    where: {
                        testId: test_id.toString(),
                    }
                })

                if (testInQuestion.status == LaboratoryTestStatus.COMPLETED) {
                    //change status 
                    const results = await prisma.laboratoryExamination.update({
                        where: {
                            testId: test_id.toString(),
                        },
                        data: {
                            status: req.body.status, //either approved or rejected 
                            dateOfApprovalXorRejection: new Date()
                        }
                    })
                    //ToDo : can create a new test with all same details (if status was rejected)
                    return res.status(200).json({ success: true, data: results });
                }
                //return unauthorized
                return res
                    .status(401)
                    .json({ success: false, message: "this test cannot be edited" });
            }
            catch (error) {
                //here should be a redirect to a general purpose error page
                return res
                    .status(500)
                    .json({ success: false, message: "ERROR : Failed to retrieve data" });
            }
        }
        //return not authorized
        return res
            .status(401)
            .json({ success: false, message: "you are not the technician ,, go away" });
    }

    return res
        .status(400)
        .json({ success: false, message: "Invalid request method" });
}