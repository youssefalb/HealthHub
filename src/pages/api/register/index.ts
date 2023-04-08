import prisma from '../../../../lib/prisma'
import {hashPassword}  from '../../../../lib/hashPassword'
import sendVerificationEmail from "../sendVerficationEmail";


//create a hashing function

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
        console.log(hashedPassword)
        var result = null
        result = await prisma.user.create({
            data: {
                fname: userData.fname,
                lname: userData.lname,
                email: userData.email,
                password: hashedPassword,
                nationalID: userData.national_id,
                patient: { create: { insurance_id: userData.insurance_id } }
            }
       })
       console.log('before Verification ${user}')
       await sendVerificationEmail(result);
       console.log("After Verification")
       res.status(200).json({ result })
    } else {
        res.status(401).json({ result: null })
    }

}
