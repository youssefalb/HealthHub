import prisma from '../../lib/prisma'
//import { getSession } from 'next-auth/react'
import { comparePassword } from '../../lib/hashPassword'
// import { NextResponse } from 'next/server'

export default async function POST(req, res) {
    const { email, password } = req.body
    console.log(email)
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    console.log("here we are");
    
    // compare hashes
    if (user && await comparePassword(password, user.password)) {
    
        res.status(200).json({ user })
    } else {
        res.status(401).json({ result: null })
    }
}
