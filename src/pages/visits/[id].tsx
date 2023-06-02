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
    const { data: session } = useSession()

    const [visit, setVisit] = useState({})
    const [tests, setTests] = useState([])

    const router = useRouter()
    const { id } = router.query

    const fetchData = async () => {
        if (session?.user && id !== undefined) {
            let res = await getVisitDetails(session.user?.role, id)
            setVisit(res['data'])
            if (res['data']['status'] != Status.REGISTERED) {
                res = await getTestsOfAVisit(session.user?.role, id)
                setTests(res['data'])
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [session, id])

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Visit details</h1>

            {(visit['status'] == Status.REGISTERED && session.user?.role === Role.DOCTOR) && // for doctor before the visit
                <div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit date" value={dayjs(visit['date']).toString()} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit status" value={visit['status']} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit description" value={visit['description']} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Patient" value={visit['patient']['user']['firstName'] + " " + visit['patient']['user']['lastName']} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <CustomButton
                            buttonText={"Cancel visit"}
                            onClick={() => {
                            router.push("#");
                            }}
                        />
                    </div>
                </div>
            }

            {(visit['status'] == Status.REGISTERED && session.user?.role === Role.PATIENT) && // for patient before the visit 
                <div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Visit date" value={dayjs(visit['date']).toString()} />
                </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Visit status" value={visit['status']} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Doctor" value={visit['doctor']['user']['firstName'] + " " + visit['doctor']['user']['lastName']} />
                </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit description" value={visit['description']} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                    <CustomButton
                        buttonText={"Cancel visit"}
                        onClick={() => {
                            router.push("#");
                        }}
                    />
                </div>
                </div>
            }

            {(visit['status'] == Status.COMPLETED && session.user?.role === Role.PATIENT) && // for patient after the visit
                <div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Visit date" value={dayjs(visit['date']).toString()} />
                </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Visit status" value={visit['status']} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Doctor" value={visit['doctor']['user']['firstName'] + " " + visit['doctor']['user']['lastName']} />
                </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit description" value={visit['description']} />
                    </div>

                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit diagnosis" value={visit['diagnosis']} />
                    </div>
                </div>
            }

            {(visit['status'] != Status.REGISTERED && session.user?.role === Role.DOCTOR) && //for doctor during and after the visit 
                <div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit date" value={dayjs(visit['date']).toString()} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit status" value={visit['status']} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit description" value={visit['description']} />
                    </div>

                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Visit diagnosis" value={visit['diagnosis']} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Patient" value={visit['patient']['user']['firstName'] + " " + visit['patient']['user']['lastName']} />
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <Label name="Tests" value={tests.map((test)=> test['doctorNote'])} />
                    </div>
                </div>
            } 
        </div>
    );
}