import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function createUser(req, res) {
    const { fname, lname, sex , email, nationalID} = req.body
  
    try {
      const user = await prisma.user.create({
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
      console.error(error.message)
      res.status(500).json({ error: 'Error creating user' })
    }
  }