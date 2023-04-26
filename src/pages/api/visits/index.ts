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

      if (req.method === "POST") {
    //Patient or Registrar creating a visit
    if (session.user?.role === Role.PATIENT) {
      try {
        const { patient_id, description, doctor_id, date } = req.body;

        const results = await prisma.visit.create({
          data: {
            description: description,
            date: date,
            doctor: { connect: { employeeId: doctor_id } },
            patient: { connect: { patientId: patient_id } },
          },
        });
        return res.status(201).json({
          success: true,
          message: "Visit created successfully by patient",
          data: results,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Failed to create visit" });
      }
    } else if (session.user?.role === Role.RECEPTIONIST) {
      try {
        const { patient_id, description, doctor_id, date } = req.body;

        const results = await prisma.visit.create({
          data: {
            description: description,
            date: date,
            doctor: { connect: { employeeId: doctor_id } },
            patient: { connect: { patientId: patient_id } },
            receptionist: {
              connect: { employeeId: session.user?.id },
            },
          },
        });
        return res.status(201).json({
          success: true,
          message: "Visit created successfully by receptionist",
          data: results,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Failed to create visit" });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "only patients and receptionists can create appointments",
      });
    }
  }

  
  // Patient, Doctor or Registrar viewing visits
      else if (req.method === "GET") {
        console.log("not here")
    try {
      let results: string | any[];
      if (session.user?.role == Role.DOCTOR) {
        let whereClause: JSONClause = {};
        whereClause.doctorId = session.user?.id;
        results = await prisma.visit.findMany({
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
        whereClause.patientId = session.user?.id;
        results = await prisma.visit.findMany({
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
