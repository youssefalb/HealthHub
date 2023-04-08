import prisma from '../../../../lib/prisma'


//create a handler that will be called when the user visits the page
export default async function handler(req, res) {
    const { id } = req.body

    const results = await prisma.visit.findMany({
            where: {
                patient_id: id
            }
        })
    if (results) {
        res.status(200).json(results)
    } else {
        res.status(400).json({message: 'No visits found'})
    }
        
}
