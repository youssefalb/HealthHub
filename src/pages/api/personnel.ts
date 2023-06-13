import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Role, Status, Specializations } from "@prisma/client";

interface JSONClause {
    [key: string]: any;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        try {
            const tempSpeciality = req.query.speciality.toString().toUpperCase();
            let speciality = Specializations[tempSpeciality]


            let results: any[];
            results = await prisma.doctor.findMany(
                {
                    where:
                    {
                        speciality: speciality
                    },
                    select: {
                        employeeId: true,
                        speciality: true,
                        user: {
                            select:
                            {
                                firstName: true,
                                lastName: true
                            }
                        }

                    },
                });
            if (!results.length) throw "no data";
            return res.status(200).json({ success: true, data: results });
        }
        catch (error) {
            if (error == "no data") {
                return res
                    .status(404)
                    .json({ success: false, message: "No data found" });
            }
            return res.status(404).json({ success: false, message: "Not found" });
        }
    }
    else {
        return res.status(400).json({ success: false, message: "Bad request" });
    }
}
