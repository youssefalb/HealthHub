import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function createUser(req, res) {
    const { fname, lname, sex , email, nationalID} = req.body
  
    res.status(500).json({ error: 'Error BSSSS' })
}
