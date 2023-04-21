import prisma from '@/lib/prisma'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            console.log(Number(id));
            const results = await prisma.laboratoryExamination.findMany({
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
                return res.status(400).json({ message: 'No laboratory examinations found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to retrieve laboratory examinations' });
        }
    } else if (req.method === 'POST') {
        const { visitId, exam_code } = req.body;
        console.log(visitId, exam_code);
        const results = await prisma.laboratoryExamination.create({
        data: {
            visit: { connect: { visit_id: visitId } },
            examinationStatus: "ORDERED",
            supervisorNotice: "Supervisor NOTICE",
            doctorNotice: "Doctor NOTICE",
            examinationDictionary: {connect: {code: exam_code}},
        },
      });
        try {
            return res.status(201).json({ success: true, data: results });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to create laboratory examination' });
        }
    } else {
        return res.status(400).json({ success: false, message: 'Invalid request method' });
    }
}
