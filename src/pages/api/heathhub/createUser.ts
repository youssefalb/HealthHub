import prisma from '../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { fname, lname, sex , email, nationalID} = req.body
    console.log(fname)
    try {
      const user = await prisma.person.create({
        data: {
          fname: fname,
          lname: lname,
          email: email,
          sex: sex,
          nationalID: nationalID,
        },
      })
    res.status(200).json(user)
    } catch (error) {
     res.status(500).json({ error: error.message })
    }
  }