import prisma from "../../../lib/prisma";


//Doctorname date and description

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { patientId, description, diagnosis, doctorId, date } = req.body;

      const results = await prisma.visit.create({
        data: {
          description: description,
          diagnosis: diagnosis,
          date: date,
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
  }
  
  
  
  else if (req.method === "GET") {
    try {
      const { id } = req.query
      // console.log('Somthinggggggggggggggggggggggggggg')
      // console.log('req BODYYY', id);
      const results = await prisma.visit.findMany({
        where: {
            patient_id: Number(id),
        },
        include: {
          doctor: {
            include: {  
              user: true,
            },
          }
        },

    });
      //console.log(results);
      if (results.length !== 0) {
        return res.status(200).json(results);
      }
      else {
        return res.status(400).json({ message: "No visits found" });
      }
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
