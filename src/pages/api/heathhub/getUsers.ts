import prisma from '../../../../lib/prisma'
import { getSession } from 'next-auth/react'


export default async function handler(req, res) {
  const user = await prisma.user.findMany({
  })
  res.status(200).send({ result: user })

}
