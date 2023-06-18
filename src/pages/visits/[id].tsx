import CustomButton from "@/components/CustomButton";
import DateAndTimePicker from "@/components/DateTimePicker";
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
    const { id } = router.query
    const { data: session } = useSession()

    //for receptionist to change the visit date
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState({ doctor: "" });
    const [showDatePicker, setShowDatePicker] = useState(false);


    // const initialTimeState = {
    //     date: dayjs().format('YYYY-MM-DD'),
    //     time: "",
    //     note: "",
    //     selectedDoctor: {
    //         doctor: ""
    //     },
    //     selectedSpecialization: "",
    // }

    const fetchData = async () => {
        if (session?.user) {
            let res = await getVisitDetails(session.user?.role, id)
            setVisit(res['data'])
            setSelectedDate(dayjs(res['data']['date']).format('YYYY-MM-DD'))
            setSelectedTime(dayjs(res['data']['date']).format('HH:mm'))
            setSelectedDoctor({ doctor: res['data']['doctor'] })
            console.log(selectedDate)
            console.log(selectedTime)
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
                    visitInfo={visit} />
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-screen-lg my-8 px-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Visit details</h1>

            {(session?.user?.role == Role.PATIENT || session?.user?.role == Role.RECEPTIONIST) && visit['doctorId'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Doctor" value={visit['doctor']['user']['firstName'] + " " + visit['doctor']['user']['lastName']} />
                </div>
            }
            {session?.user?.role == Role.DOCTOR && visit['patientId'] &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Patient" value={visit['patient']['user']['firstName'] + " " + visit['patient']['user']['lastName']} />
                </div>
            }

            {visit['description'] && (session?.user?.role == Role.PATIENT || session?.user?.role == Role.DOCTOR) &&
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

            {tests && (session?.user?.role == Role.PATIENT || session?.user?.role == Role.DOCTOR) &&
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <Label name="Tests" value={
                        tests?.map((test => test.examinationDictionary.name)).join(", ") + "."
                    } />
                </div>
            }
            {session?.user?.role === Role.RECEPTIONIST && visit['status'] === Status.REGISTERED && (
                <>
                    {showDatePicker ? (
                        <div className="flex-col flex">
                            <DateAndTimePicker
                                doctor={selectedDoctor?.doctor}
                                date={selectedDate}
                                saveDate={setSelectedDate}
                                saveTime={setSelectedTime}
                            />
                            <CustomButton onClick={() => { }} buttonText="Save the date" />
                        </div>

                    ) : (
                        <CustomButton onClick={() => setShowDatePicker(true)} buttonText="Change the visit Date" />
                    )}
                </>
            )
            }

            <div className="flex flex-row gap-2 md:gap-8 items-stretch">
                {visit['status'] == Status.REGISTERED &&
                    <div>
                        <CustomButton
                            buttonText={"Cancel visit"}
                            onClick={() => {
                                changeVisitDetails(visit['visitId'], { "status": Status.CANCELLED })
                                router.push("/visits"); //Ths works just for patient or doctor (To change later)
                            }}
                        />
                    </div>
                }

                {visit['status'] == Status.REGISTERED && session.user?.role == Role.DOCTOR &&
                    <CustomButton
                        buttonText={"Start visit"}
                        onClick={() => {
                            setCurrentlyInProgress(true);
                            changeVisitDetails(visit['visitId'], { "status": Status.IN_PROGRESS })
                        }}
                    />
                }
            </div>
        </div >
    );
}