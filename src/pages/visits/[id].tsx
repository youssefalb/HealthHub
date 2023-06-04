import CustomButton from "@/components/CustomButton";
import Label from "@/components/Label";
import VisitInProgress from '@/components/VisitInProgress';
import { getOwnTests, getTestsOfAVisit } from "@/lib/tests";
import { changeVisitDetails, getVisitDetails } from "@/lib/visits";
import { Role, Status } from "@prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Visit() {

    const [visit, setVisit] = useState({})
    const [tests, setTests] = useState([])
    const [CurrentlyInProgress, setCurrentlyInProgress] = useState(false)
    const router = useRouter()
    const { id }  = router.query 
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

    if (CurrentlyInProgress) {
        return (
            <div className="mx-auto max-w-screen-lg my-8 px-4">
                <VisitInProgress
                visitInfo={visit}/>
            </div>
        )
    }
    
    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Visit details</h1>

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

            {visit['description'] &&
                <div className="w-full md:w-1/2 px-4 mb-4 ">
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
            
            {tests  &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Tests" value={
                        tests?.map((test=> test.examinationDictionary.type)).join(", ") +"."
                    } />
                </div>
            }
            <div className="flex flex-row gap-2 md:gap-8 items-stretch">
            {visit['status'] == Status.REGISTERED &&
                    <CustomButton
                        buttonText={"Cancel visit"}
                        onClick={() => {
                            router.push("#");
                        }}
                    />
            }

            {visit['status'] == Status.REGISTERED && session.user?.role == Role.DOCTOR &&
                    <CustomButton
                        buttonText={"Start visit"}
                        onClick={() => {
                            setCurrentlyInProgress(true);
                            // changeVisitDetails(visit['visitId'], { "status": Status.IN_PROGRESS })
                        }}
                    />
                }
                </div>
        </div>
    );
}
