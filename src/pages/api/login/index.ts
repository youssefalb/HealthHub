import prisma from '../../../../lib/prisma'
//import { getSession } from 'next-auth/react'


export default async function handler(req, res) {
    const { email, password } = req.body
    console.log(email)
    const user = await prisma.user.findUnique({
      where : {
       email: email
      }
  })

  // compare hashes
  if (user && user.password == password) {
    res.status(200).json({ user })
  } else {
    res.status(401).json({ result: null })
  }
}
