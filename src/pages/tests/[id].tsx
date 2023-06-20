import CustomButton from "@/components/CustomButton";
import Label from "@/components/Label";
import { approveTest, finishPerformingTest, getTestDetails, rejectTest, startPerformingTest } from "@/lib/tests";
import { TextField } from "@mui/material";
import { LaboratoryTestStatus, Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Test() {

    const [test, setTest] = useState({})
    const [assistantNote, setAssistantNote] = useState("")

    const router = useRouter()
    const { id } = router.query
    const { data: session } = useSession()

    const fetchData = async () => {
        if (session?.user) {
            const res = await getTestDetails(session.user?.role, id)
            setTest(res['data'])
        }
    }

    useEffect(() => {
        fetchData()
    }, [session])

    async function handleTestCompleted(status) {

        await finishPerformingTest(test['testId'], status, assistantNote)

        //reset all states to empty
        setAssistantNote("")
        router.back()
    }

    return (
        <div className='flex flex-col justify-center'>

            <h1 className="text-3xl font-bold mb-6">Test details</h1>
            {test['examinationDictionary'] &&
                <div className="w-full md:w-1/2 px-4 mb-4 ">
                    <Label name="Name" value={test['examinationDictionary'].name} />
                </div>
            }

            {test['doctorNote'] &&
                <div className="w-full md:w-1/2 px-4 mb-4 ">
                    <Label name="Doctor note" value={test['doctorNote']} />
                </div>
            }

            {test['status'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Status" value={test['status']} />
                </div>
            }


            {test['status'] == LaboratoryTestStatus.IN_PROGRESS &&
                <div className='flex flex-col' id='DIAGNOSIS'>
                    <TextField
                        fullWidth
                        required
                        label="Note"
                        value={assistantNote}
                        onChange={(v) => setAssistantNote(v.target.value)}
                    />
                </div>
            }

            <div className="flex flex-row gap-2 md:gap-8 items-stretch">
                <CustomButton
                    buttonText="Back to Tests"
                    onClick={() => {
                        router.back()
                    }}
                />

                {test['status'] == LaboratoryTestStatus.IN_PROGRESS &&
                    <CustomButton
                        buttonText={"Cancel Test"}
                        disabled={assistantNote == ""}
                        onClick={async () => { await handleTestCompleted(LaboratoryTestStatus.CANCELLED) }}
                    />
                }

                {test['status'] == LaboratoryTestStatus.IN_PROGRESS &&
                    <CustomButton
                        buttonText="Test Completed"
                        disabled={assistantNote == ""}
                        onClick={async () => { await handleTestCompleted(LaboratoryTestStatus.COMPLETED) }}
                    />
                }

                {test['status'] == LaboratoryTestStatus.ORDERED && session.user?.role == Role.LAB_ASSISTANT &&
                    <CustomButton
                        buttonText={"Take Test"}
                        onClick={async () => {
                            await startPerformingTest(test['testId'])
                            router.push("/tests")
                        }}
                    />
                }

                {test['status'] == LaboratoryTestStatus.COMPLETED && session.user?.role == Role.LAB_SUPERVISOR &&
                    <CustomButton
                        buttonText={"Reject Test"}
                        onClick={async () => {
                            await rejectTest(test['testId'])
                            router.push("/tests")
                        }}
                    />
                }

                {test['status'] == LaboratoryTestStatus.COMPLETED && session.user?.role == Role.LAB_SUPERVISOR &&
                    <CustomButton
                        buttonText={"Approve Test"}
                        onClick={async () => {
                            await approveTest(test['testId'])
                            router.push("/tests")
                        }}
                    />
                }
            </div>

        </div>
    );
}
