import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";



export default async function handler(req, res) {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
      },
    })
    return res.status(200).send("Email address verified successfully");
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
}