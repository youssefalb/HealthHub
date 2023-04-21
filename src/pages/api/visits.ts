import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "./auth/[...nextauth]";
import { Role } from "@prisma/client";

//here we handle all visits-related api calls
//ToDo : update method to change 
//ToDo : delete method to cancel appointment
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions); //authenticate user on the server side
    if (session) {
        //if method is delete, check role for patiend and receptionist and doctor and delete teh visit
        // if (req.method === "DELETE") {
        //     const { id, role } = req.query
        //     const result = await prisma.visit.delete({
        //         where: {
        //             id: Number(id),
        //         },
        //     })
        //     return res.status(200).json({
        //         success: true,
        //         message: "Visit deleted successfully",
        //         data: result,
        //     })
        // }


        if (req.method === "POST") { //Patient or Registrar creating a visit
            try {
                const { patientId, description, diagnosis, doctorId, date } = req.body;
                let receptionistId;

                if (session.user?.role === Role.RECEPTIONIST) {
                  receptionistId = session.user.id;
                }
                const results = await prisma.visit.create({
                  data: {
                    description: description,
                    diagnosis: diagnosis,
                    date: date,
                    doctor: { connect: { employee_id: doctorId } },
                    patient: { connect: { patient_id: patientId } },
                    receptionist: { connect: { employee_id: receptionistId } },
                  },
                });
                return res.status(201).json({
                    success: true,
                    message: "Visit created successfully",
                    data: results,
                });
            } catch (error) {
                return res
                    .status(500)
                    .json({ success: false, message: "Failed to create visit" });
            }
        }

        // Patient, Doctor or Registrar viewing visits
        else if (req.method === "GET") { 
            try {
                const { role, id } = req.query
                let results: string | any[]
                if (role == Role.DOCTOR) {
                    results = await prisma.visit.findMany({
                        where: {
                            doctor_id: Number(id),
                        },
                        include: {
                            patient: {
                                include: {
                                    user: {
                                        select: {
                                            fname: true,
                                            lname: true,
                                        }
                                    }
                                },
                            }
                        },

                    });
                } else if (role == Role.PATIENT) {
                    results = await prisma.visit.findMany({
                        where: {
                            patient_id: Number(id),
                        },
                        include: {
                            doctor: {
                                include: {
                                    user: {
                                        select: {
                                            fname: true,
                                            lname: true,
                                        }
                                    }
                                },
                            }
                        },
                    });
                } else if (role == Role.RECEPTIONIST) {
                    results = await prisma.visit.findMany({
                        where: {
                            date: {
                                gte: new Date()
                            }
                        }
                    });
                }

                //I dont think this check is needed (here), the caller checks the response size and renders response or place holder 
                if (results.length !== 0) {
                    return res.status(200).json(results);
                }
                else {
                    return res.status(400).json({ message: "No visits found" });
                }
            } catch (error) { //here should be a redirect to a general purpose error page
                return res
                    .status(500)
                    .json({ success: false, message: "Failed to retrieve visits" });
            }
        }
        else {
            return res
                .status(400)
                .json({ success: false, message: "Invalid request method" });
        }
    }
    return res.status(401).json({ success: false, message: "Unauthorized" })
}
