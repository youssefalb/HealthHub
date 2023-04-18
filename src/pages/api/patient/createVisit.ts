import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
    const { patientId, description, diagnosis, doctorId } = await req.body;
    
    const results = await prisma.visit.create({
        data: {
            description: description ,
            diagnosis: diagnosis,
            doctor: { connect: { employee_id: doctorId } },
            patient: { connect: { patient_id: patientId } },
        }
    })
    console.log(results)


}
