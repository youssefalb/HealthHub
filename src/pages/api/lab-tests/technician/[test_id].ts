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

    // let accessGranted = false;

    if (!session)
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized because not logged in" });
    const { test_id } = req.query
    if (req.method == "GET") {
        if (session.user?.role == Role.LAB_ASSISTANT) {
            try {
                const test = await prisma.laboratoryExamination.findUnique({
                    where: {
                        testId: test_id.toString(),
                    },
                })
                if(test.labAssistantId == session.user.id)
                    return res.status(200).json({ success: true, data: test });

                return res
                    .status(401)
                    .json({ success: false, message: "this test doesn't nbelong to you" });
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
            .json({ success: false, message: "you are not a Doctor" });
    }

    if (req.method == "PUT") {
        if (session.user?.role == Role.LAB_ASSISTANT) {
            try {
                const testInQuestion = await prisma.laboratoryExamination.findUnique({
                    where: {
                        testId: test_id.toString(),
                    }
                })

                if (testInQuestion.status == LaboratoryTestStatus.ORDERED) {
                    //assign self to perform the test
                    const results = await prisma.laboratoryExamination.update({
                        where: {
                            testId: test_id.toString(),
                        },
                        data: {
                            status: LaboratoryTestStatus.IN_PROGRESS, //from ordered to in progress 
                            labAssistantId: session.user.id
                        }
                    })
                    return res.status(200).json({ success: true, data: results });
                }
                else if (testInQuestion.status == LaboratoryTestStatus.IN_PROGRESS && session.user?.id == testInQuestion.labAssistantId) {
                    //update result
                    const results = await prisma.laboratoryExamination.update({
                        where: {
                            testId: test_id.toString(),
                        },
                        data: {
                            status: req.body.status, //from in progress to completed or Cancelled 
                            //result: 
                        }
                    })
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