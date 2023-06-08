import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const user_id = req.query.user_id;
      const user = await prisma.user.findUnique({
        where: {
          id: user_id.toString(),
        },

      })
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ data: user });
    }
    
    else if (req.method === "PUT") {
      const user_id = req.query.user_id;
      const user = await prisma.user.update({
        where: {
          id: user_id.toString(),
        },
        data: req.body,
      })
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ data: user });

    }



  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user information" });
  }
}
