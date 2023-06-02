import CustomButton from "@/components/CustomButton";
import Label from "@/components/Label";
import { getOwnTests, getTestsOfAVisit } from "@/lib/tests";
import { getVisitDetails } from "@/lib/visits";
import { Role, Status } from "@prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Visit() {

    const [visit, setVisit] = useState({})
    const [tests, setTests] = useState([])

    const router = useRouter()
    const { id } = router.query
    const { data: session } = useSession()

    const fetchData = async () => {
        if (session?.user) {
            let res = await getVisitDetails(session.user?.role, id)
            setVisit(res['data'])
            res = await getTestsOfAVisit(session.user?.role, id)
            setTests(res['data'])
        }
    }

    useEffect(() => {
        fetchData()
    }, [session])

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Visit details</h1>
            {visit['description'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Visit description" value={visit['description']} />
                </div>
            }

            {visit['diagnosis'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Visit diagnosis" value={visit['diagnosis']} />
                </div>
            }
            {visit['status'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Visit status" value={visit['status']} />
                </div>
            }
            {visit['date'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Visit date" value={dayjs(visit['date']).toString()} />
                </div>
            }
            {session?.user?.role == Role.PATIENT && visit['doctorId'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Doctor" value={visit['doctor']['user']['firstName'] + " " + visit['doctor']['user']['lastName']} />
                </div>
            }
            {session?.user?.role == Role.DOCTOR && visit['patientId'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Patient" value={visit['patient']['user']['firstName'] + " " + visit['patient']['user']['lastName']} />
                </div>
            }
            {tests != null &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                     <Label name="Tests" value={tests?.map((test)=> test['doctorNote'])} />
                </div>
            }
            {visit['status'] == Status.REGISTERED &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <CustomButton
                        buttonText={"Cancel visit"}
                        onClick={() => {
                            router.push("#");
                        }}
                    />
                </div>
            }
        </div>
    );
}