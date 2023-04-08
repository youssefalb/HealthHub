import { IncrementalCache } from 'next/dist/server/lib/incremental-cache'
import prisma from '../../../../lib/prisma'



export default async function handler(req, res) {
    const { id } = req.query
    console.log(Number(id))
    const results = await prisma.physicalExamination.findMany({
        where: {
            visit_id: Number(id)
        },
        include: {
            examinationDictionary: true
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
