import prisma from '../../../../lib/prisma'

//I think we should make this endpoint returning only for
// a single visit each time and loop through the visits in the frontend
//I think this is the best way to do it, but I'm not sure

export default async function handler(req, res) {
    const { id } = req.query
    console.log(Number(id))
    const results = await prisma.laboratoryExamination.findMany({
        where: {
            visit_id: Number(id)
        }
    })
    console.log(results)
    if (results.length != 0) {
        res.status(200).json(results)
    }
    else {
        res.status(400).json({ message: 'No laboratory examinations found' })
    }
        
}
