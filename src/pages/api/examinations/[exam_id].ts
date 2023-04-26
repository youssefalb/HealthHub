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
    const { exam_id } = req.query;
    const { role, id: user_id } = session.user;
    if (
      role === Role.DOCTOR ||
      role === Role.PATIENT
    ) {
      //if it was a doctor or patient, check that the visit belongs to them
      try {

        const exam = await prisma.physicalExamination.findUnique({
          where: {
            physical_exam_id: Number(exam_id),
          },
          include: {
            visit: true,
          },
        });
        if (
          exam?.visit.doctor_id !== Number(user_id) &&
          exam?.visit.patient_id !== Number(user_id)
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
            console.log("data obj:", data);
            // await prisma.visit.update({
            //   where: {
            //     physical_exam_id: Number(exam_id),
            //   },
            //   data: data,
            // });
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
      console.log(exam_id)
      let results: string | any;
      if (session.user?.role == Role.DOCTOR) {
        let doctor_id = session.user?.id;
        let whereClause: JSONClause = {
          physical_exam_id: Number(exam_id),
          visit: {
            doctor_id: Number(doctor_id),
          },
        };

        whereClause.physical_exam_id = exam_id;
        results = await prisma.physicalExamination.findUnique({
          where: whereClause,
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
        let patient_id = session.user?.id;
        const whereClause: JSONClause = {
          physical_exam_id: Number(exam_id),
          visit: {
            patient_id: Number(patient_id),
          },
        };

        const results = await prisma.physicalExamination.findMany({
          where: whereClause,
          include: {
            visit: true,
          },
        });

        if (results) {
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
      return res.status(200).json({ success: true, data: results });
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
