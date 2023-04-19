import prisma from "../../../lib/prisma";


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { visitId, exam_code} = req.body;

      const results = await prisma.physicalExamination.create({
        data: {
          visit: { connect: { visit_id: visitId } },
          examinationDictionary: {connect: {code: exam_code}},
        },
      });
      console.log(results);
      return res.status(201).json({
        success: true,
        message: "Physical examination created successfully",
        data: results,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to create physical examination" });
    }
  } else if (req.method === "GET") {
    try {
      const { id } = req.query;
      console.log(Number(id));
      const results = await prisma.physicalExamination.findMany({
        where: {
          visit_id: Number(id),
        },
        include: {
          examinationDictionary: true,
        },
      });
      console.log(results);
      if (results.length !== 0) {
        return res.status(200).json(results);
      } else {
        return res
          .status(400)
          .json({ message: "No laboratory examinations found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve physical examinations",
      });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid request method" });
  }
}
