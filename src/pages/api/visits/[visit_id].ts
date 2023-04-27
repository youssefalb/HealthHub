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
  if (!session)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized because not logged in" });


  //if method is PUT, check if the user is a doctor, patient or receptionist
  //changing date needs to be accomodated
  if (req.method === "PUT") {
    const { visit_id } = req.query;
    
    const { role, id: user_id } = session.user;
    if (
      role === Role.DOCTOR ||
      role === Role.PATIENT ||
      role === Role.RECEPTIONIST
    ) {
      //if it was a doctor or patient, check that the visit belongs to them
      try {
        const visit = await prisma.visit.findUnique({
          where: {
            visitId: visit_id.toString(),
          },
        });
        if (
          role !== Role.RECEPTIONIST &&
          visit?.patientId !== user_id &&
          visit?.doctorId !== user_id
        ) {
          return res
            .status(401)
            .json({
              success: false,
              message: "Unauthorized, because this visit doesn't belong to you",
            });
        } else {
          try {
            const { date, doctor_id, status } = req.body;
            let data: JSONClause = {};
            if (date) {
              data.date = date;
            }
            if (doctor_id) {
              data.doctorId = doctor_id;
            }
            if (status) {
              data.status = status;
            }
            await prisma.visit.update({
              where: {
                visitId: visit_id.toString(),
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
        const { visit_id } = req.query;
      //console.log(visit_id)
      let results: string | any;
      if (session.user?.role == Role.DOCTOR) {
        let whereClause: JSONClause = {};
        whereClause.visitId = visit_id;
        
        results = await prisma.visit.findUnique({
          where: whereClause,
          include: {
            patient: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        });
      } else if (session.user.role == Role.PATIENT) {
        let whereClause: JSONClause = {};
        whereClause.visitId = visit_id;
        results = await prisma.visit.findUnique({
          where: whereClause,
          include: {
            doctor: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        });
      } else if (session.user?.role == Role.RECEPTIONIST) {
        //todo
        results = await prisma.visit.findMany({
          where: {
            date: {
              gte: new Date(),
            },
          },
        });
      }
      return res.status(200).json({ success: true, data: results });
    } catch (error) {
      //here should be a redirect to a general purpose error page
      return res
        .status(500)
        .json({ success: false, message: "Failed to retrieve visits" });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid request method" });
  }
}
