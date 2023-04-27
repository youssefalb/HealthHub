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
  const session = await getServerSession(req, res, authOptions); //authenticate user on the server side
  // console.log(session.user?.role)
  if (!session)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized because not logged in" });


  //if method is PUT, check if the user is a doctor, patient or receptionist
  //changing date needs to be accomodated
  if (req.method === "PUT") {
    var { exam_id } = req.query;
    exam_id = exam_id.toString(); 
    const { role, id: user_id } = session.user;
    if (
      role === Role.DOCTOR ||
      role === Role.PATIENT
    ) {
      //if it was a doctor or patient, check that the visit belongs to them
      try {

        const exam = await prisma.physicalExamination.findUnique({
          where: {
            physicalExamId: exam_id,
          },
          include: {
            visit: true,
          },
        });
        if (
          exam?.visit.doctorId !== user_id &&
          exam?.visit.patientId !== user_id
        ) {
          return res
            .status(401)
            .json({
              success: false,
              message: "Unauthorized, because this visit doesn't belong to you",
            });
        } else {
          try {  //date and status to be added later to the db schema
            const { status } = req.body;
            let data: JSONClause = {};
            if (status) {
              data.status = status;
            }
            await prisma.physicalExamination.update({
              where: {
                 physicalExamId: exam_id,
               },
               data: data,
            });
          } catch (error) {
            return res
              .status(500)
              .json({ success: false, message: "failed to update visit" });
          }
          return res
            .status(200)
            .json({ success: true, message: "Visit updated successfully" });
        }
      } catch (error) {
        return res
          .status(404)
          .json({ success: false, message: "Failed to find such a visit" });
      }
    } else {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Unauthorized because you are not the correct person.. go away",
        });
    }
  }

  // Patient, Doctor or Registrar viewing one particular visit
  else if (req.method === "GET") {
    try {
      const { exam_id } = req.query;
      let results: string | any;
      if (session.user?.role == Role.DOCTOR) {
        let doctor_id = session.user?.id;
        let whereClause: JSONClause = {
          physicalExamId: exam_id,
          visit: {
            doctorId: doctor_id,
          },
        };

        results = await prisma.physicalExamination.findUnique({
          where: {
            physicalExamId: exam_id.toString()
          },
          include: {
            visit: true,
          },
        });



        if (results) {
          return res.status(200).json({ success: true, data: results });
        } else {
          return res
            .status(500)
            .json({ success: false, message: "The visit of the exam does not belong to visits of the doctor" });
        }

      } else if (session.user.role == Role.PATIENT) {
      //console.log("request went here")

        let patient_id = session.user?.id;
        const whereClause: JSONClause = {
          physicalExamId: exam_id.toString(),
          visit: {
            patientId: patient_id,
          },
        };

        const results = await prisma.physicalExamination.findUnique({
          where: {
            physicalExamId: exam_id.toString()
          },
          include: {
            visit: true,
          },
        });

        if (results.visit.patientId === patient_id) {
          return res.status(200).json({ success: true, data: results });
        } else {
          return res
            .status(500)
            .json({ success: false, message: "The visit of the exam does not belong to visits of the patient" });
        }
      }
      else {
        return res
          .status(500)
          .json({ success: false, message: "You should be a patient or a doctor to view this page" });
      }
    } catch (error) {
      //here should be a redirect to a general purpose error page
      return res
        .status(500)
        .json({ success: false, message: "Failed to retrieve Pysical examination" });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid request method" });
  }
}
