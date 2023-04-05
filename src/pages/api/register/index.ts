import prisma from '../../../../lib/prisma'
import {hashPassword}  from '../../../utils/hashPassword'

//create a hashing function

export default async function handler(req, res) {
    const { fname, lname, email, password, insurance_id, national_id } = req.body
    console.log(email)
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    
    if (!user) {
        const hashedPassword = await hashPassword(password)
        console.log(hashedPassword)
        const result = await prisma.user.create({
            data: {
                fname: fname,
                lname: lname,
                email: email,
                password: hashedPassword,
                nationalID: national_id,
                patient: { create: { insurance_id: insurance_id } }
            }
        })
       res.status(200).json({ result })
    } else {
        res.status(401).json({ result: null })
    }

}
