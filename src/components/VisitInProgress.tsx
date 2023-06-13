import { useRouter } from 'next/router';
import CustomButton from './CustomButton';
import ProfilePicture from './ProfilePicture';
import { useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { getTestsNames, orderTestAsDoctor } from '@/lib/tests';
import { OutlinedInput } from '@mui/material';
import { createExamination } from '@/lib/examinations';
import { changeVisitDetails } from '@/lib/visits';
import { Status } from '@prisma/client';
import Label from "@/components/Label";
import CancellingButton from '@/components/CancellingButton';
import ExaminationsToOrder from './ExaminationsToOrder';



export default function VisitInProgress({ visitInfo }) {
    const router = useRouter()
    const [patientInfo, setPatientInfo] = useState({}) //1
    const [doctorInfo, setDoctorInfo] = useState({}) //2

    const [testsNames, setTests] = useState([]) //3
    const [disabledTestOptions, setDisabledTestOptions] = useState([]); //4
    const [disabledExaminationOptions, setDisabledExaminationOptions] = useState([]); //5


    const [selectedTest, setSelectedTest] = useState("") //6
    const [selectedExamination, setSelectedExamination] = useState("") //7

    const [orderedTests, setOrderedTests] = useState([]) //8
    const [performedExaminations, setPerformedExaminations] = useState([]) //9

    const [diagnosis, setDiagnosis] = useState("")
    const [description, setDescription] = useState("")

    const [doctorNoteOnTest, setDoctorNoteOnTest] = useState("")
    const [doctorNoteOnExamination, setDoctorNoteOnExamination] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const tests = await getTestsNames()
            setTests(tests.data)
        }

        setPatientInfo(visitInfo['patient'])
        setDoctorInfo(visitInfo['doctor'])
        setTests(visitInfo['tests'])

        fetchData()
    }, [])


    const handleOrderTest = () => {
        let test = testsNames.find((test) => test.code === selectedTest)
        test.note = doctorNoteOnTest
        if (!orderedTests.includes(test)) {
            setDisabledTestOptions((prevOptions) => [...prevOptions, test])
            setOrderedTests([...orderedTests, test])
        }
        setSelectedTest('')
        setDoctorNoteOnTest('')
    };

    const handlePerformTest = () => {
        let examination = testsNames.find((test) => test.code === selectedExamination)
        examination.note = doctorNoteOnExamination
        if (!performedExaminations.includes(examination)) {
            setDisabledExaminationOptions((prevOptions) => [...prevOptions, examination])
            setPerformedExaminations([...performedExaminations, examination])
        }
        setSelectedExamination('')
        setDoctorNoteOnExamination('')
    };


    function handleRemoveTest(removedTest) {
        setOrderedTests(orderedTests.filter((test) => test.code !== removedTest.code))
        setDisabledTestOptions(orderedTests.filter((test) => test.code !== removedTest.code))
    }

    function handleRemoveExamination(removedExamnation) {
        setPerformedExaminations(performedExaminations.filter((exam) => exam.code !== removedExamnation.code))
        setDisabledExaminationOptions(performedExaminations.filter((exam) => exam.code !== removedExamnation.code))
    }

    function handleVisitCompleted() {
        orderedTests.forEach((test) => {
            orderTestAsDoctor(visitInfo['visitId'], test.code, test.note)
        })
        performedExaminations.forEach((exam) => {
            createExamination(visitInfo['visitId'], exam.code, exam.note)
        })
        const visitData = {
            "status": Status.COMPLETED,
            "description": description,
            "diagnosis": diagnosis
        }
        changeVisitDetails(visitInfo['visitId'], visitData)

        //reset all states to empty
        setOrderedTests([])
        setPerformedExaminations([])
        setDisabledTestOptions([])
        setDisabledExaminationOptions([])
        setDiagnosis('')
        setDescription('')
        setDoctorNoteOnTest('')
        setDoctorNoteOnExamination('')
        setSelectedTest('')
        setSelectedExamination('')
        router.push('/visits')        

    }


    return (
            <div className='flex flex-col justify-center'>
                <CustomButton
                    buttonText="Back to Appointments"
                    onClick={() => {
                        router.push("/visits");
                    }}
                />
                <div className="bg-gray-100 rounded-lg flex flex-col items-center gap-4 max-w-lg self-center sm:px-4 md:min-w-full" id='USERINFO'>

                    <ProfilePicture
                        src={patientInfo.user?.image ? patientInfo.user?.image : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"}
                        alt={'image of the user'}
                        size={3}
                    />
                    <h3>{patientInfo.user?.firstName}</h3>

                    <div className='flex flex-row items-stretch h-auto justify-between  gap-4 mx-2'>
                        <CustomButton
                            buttonText="Show History"
                            onClick={() => {
                                router.push("/tests");
                            }}
                        />
                        <CustomButton
                            buttonText="Message"
                            onClick={() => {
                                router.push("/visits");
                            }}
                        />
                    </div>
                </div>

            <div className='mt-2'>
                <ExaminationsToOrder 
                    title="Ordered Tests:"
                    itemList={orderedTests}
                    callBack={handleRemoveTest}
                />

                <ExaminationsToOrder
                    title="Performed Examinations"
                    itemList={performedExaminations}
                    callBack={handleRemoveExamination}
                />
                </div>

                <div className='p-6 flex flex-col gap-4 FORM'>

                    <div className='flex flex-col' id='DESCRIPTION'>
                        <TextField
                            fullWidth
                            required
                            label="Description"
                            value={description}
                            onChange={(v) => setDescription(v.target.value)}
                        />
                    </div>

                    <div className='flex flex-col gap-2' id='TESTS'>
                        <div className='flex flex-row gap-2'>
                            <FormControl fullWidth className=''>
                                <InputLabel id="tests">Tests</InputLabel>
                                <Select
                                    labelId="tests"
                                    value={selectedTest}
                                    autoWidth={true}
                                    input={<OutlinedInput label="Tests" />}
                                    onChange={(v) => {
                                        setSelectedTest(v.target.value)
                                        setDoctorNoteOnTest('')
                                    }
                                    }
                                >
                                    {testsNames?.map((test) => (
                                        <MenuItem
                                            disabled={disabledExaminationOptions.concat(disabledTestOptions).includes(test)}
                                            key={test.code}
                                            value={test.code}
                                        >
                                            {test.type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <CustomButton
                            buttonText="Order"
                            disabled={selectedTest == ""}
                            color='green'
                                onClick={() => {
                                    handleOrderTest()
                                }}
                            />
                        </div>
                        {selectedTest !== "" &&
                            <TextField
                                fullWidth
                                multiline
                                placeholder='Note to the lab assistant'
                                value={doctorNoteOnTest}
                                onChange={(v) => setDoctorNoteOnTest(v.target.value)
                                }
                            />
                        }
                    </div>

                    <div className='flex flex-col gap-2' id='EXAMS'>
                        <div className='flex flex-row gap-2 EXAMINATION'>
                            <FormControl fullWidth className=''>
                                <InputLabel id="exams">Physical Examinations</InputLabel>
                                <Select
                                    labelId="exams"
                                    value={selectedExamination}
                                    autoWidth={true}
                                    input={<OutlinedInput label="Physical Examinations" />}
                                    onChange={(v) => {
                                        setSelectedExamination(v.target.value)
                                        setDoctorNoteOnExamination('')
                                    }}
                                >
                                    {testsNames?.map((test) => (
                                        <MenuItem
                                            disabled={disabledExaminationOptions.concat(disabledTestOptions).includes(test)}
                                            key={test.code}
                                            value={test.code}
                                        >
                                            {test.type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <CustomButton
                            buttonText="Perform"
                            disabled = {selectedExamination==""}
                                onClick={() => {
                                    handlePerformTest()
                                }}
                            />
                        </div>
                        {selectedExamination &&
                            <TextField
                                fullWidth
                                multiline
                                placeholder='note'
                                onChange={(v) => setDoctorNoteOnExamination(v.target.value)
                                }
                            />
                        }
                    </div>

                    <div className='flex flex-col' id='DIAGNOSIS'>
                        <TextField
                            fullWidth
                            required
                            label="Diagnosis"
                            value={diagnosis}
                            onChange={(v) => setDiagnosis(v.target.value)}
                        />
                    </div>

                <div className='flex flex-row justify-between w-full gap-1' id='BUTTONS'>
                    <CustomButton
                        buttonText="Visit Completed"
                        width="threeFifths"
                        disabled={diagnosis==""}
                            onClick={() => {
                                handleVisitCompleted()
                            }
                            }
                        />

                        <CustomButton
                        buttonText="Cancel Visit"
                        width="twoFifths"
                            onClick={() =>
                                changeVisitDetails(visitInfo['visitId'], { "status": Status.CANCELLED })
                            }
                            color='red'
                        />

                    </div>
                </div>
            </div>
        )
    }