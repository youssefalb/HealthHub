import prisma from "../../../lib/prisma";


//Get for now returns all visits, will need to be changed to return only visits for a specific patient

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { patientId, description, diagnosis, doctorId } = req.body;

      const results = await prisma.visit.create({
        data: {
          description: description,
          diagnosis: diagnosis,
          doctor: { connect: { employee_id: doctorId } },
          patient: { connect: { patient_id: patientId } },
        },
      });
      console.log(results);
      return res.status(201).json({
        success: true,
        message: "Visit created successfully",
        data: results,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to create visit" });
    }
  } else if (req.method === "GET") {
    try {
      const visits = await prisma.visit.findMany();
      console.log(visits);
      return res.status(200).json({
        success: true,
        message: "Visits retrieved successfully",
        data: visits,
      });
    } catch (error) {
      console.error(error);
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
