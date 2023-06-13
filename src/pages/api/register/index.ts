import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/hashPassword'
import sendVerificationEmail from '@/lib/sendVerificationEmail'


//create a hashing function
//test commit

export default async function handler(req, res) {
    const userData = req.body
    // console.log(userData.email)
    const user = await prisma.user.findUnique({
        where: {
            email: userData.email
        }
    })


    if (!user) {

        const hashedPassword = await hashPassword(userData.password)
        //console.log(hashedPassword)
        var result = null
        result = await prisma.user.create({
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashedPassword,
                nationalId: userData.nationalId,
                patient: { create: { insuranceId: userData.insuranceId } }
            }
        })
        await sendVerificationEmail(result);
        res.status(200).json({ result })
    } else {
        res.status(401).json({ result: null })
    }

}
