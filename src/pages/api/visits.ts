import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "./auth/[...nextauth]";
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
            doctor: { connect: { employee_id: doctor_id } },
            patient: { connect: { patient_id: patient_id } },
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
            doctor: { connect: { employee_id: doctor_id } },
            patient: { connect: { patient_id: patient_id } },
            receptionist: {
              connect: { employee_id: Number(session.user?.id) },
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

  //if method is PUT, check if the user is a doctor, patient or receptionist
  //changing date needs to be accomodated
  if (req.method === "PUT") {
    const { visit_id } = req.body;
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
            visit_id: Number(visit_id),
          },
        });
        if (
          role !== Role.RECEPTIONIST &&
          visit?.patient_id !== Number(user_id) &&
          visit?.doctor_id !== Number(user_id)
        ) {
          return res
            .status(401)
            .json({
              success: false,
              message: "Unauthorized, because this visit doesn't belong to you",
            });
        } else {
          try {
            const { newDate, newDoctor_id, newStatus } = req.body;
            let data: JSONClause = {};
            if (newDate) {
              data.date = newDate;
            }
            if (newDoctor_id) {
              data.doctor_id = newDoctor_id;
            }
            if (newStatus) {
              data.status = newStatus;
            }
            console.log("data obj:", data);
            await prisma.visit.update({
              where: {
                visit_id: Number(visit_id),
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

  // Patient, Doctor or Registrar viewing visits
  else if (req.method === "GET") {
    try {
      const { visit_id } = req.query;
      let results: string | any[];
      if (session.user?.role == Role.DOCTOR) {
        let whereClause: JSONClause = {};
        whereClause.doctor_id = session.user?.id;
        if (visit_id) {
          whereClause.visit_id = visit_id;
        }
        results = await prisma.visit.findMany({
          where: whereClause,
          include: {
            patient: {
              include: {
                user: {
                  select: {
                    fname: true,
                    lname: true,
                  },
                },
              },
            },
          },
        });
      } else if (session.user.role == Role.PATIENT) {
        let whereClause: JSONClause = {};
        whereClause.patient_id = session.user?.id;
        console.log("clause", whereClause);
        if (visit_id) {
          whereClause.visit_id = visit_id;
        }
        console.log("request", whereClause);
        results = await prisma.visit.findMany({
          where: whereClause,
          include: {
            doctor: {
              include: {
                user: {
                  select: {
                    fname: true,
                    lname: true,
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
