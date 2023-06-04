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


export default function VisitInProgress({ visitInfo }) {
    const router = useRouter()
    const [patientInfo, setPatientInfo] = useState({})
    const [doctorInfo, setDoctorInfo] = useState({})
    const [testsNames, setTests] = useState([])

    const [selectedTest, setSelectedTest] = useState([{
        code: '',
        name: '',
        ordered: true,
    }])
    const [selectedExamination, setSelectedExamination] = useState([{
        code: '',
        name: '',
        performed: true,
    }])

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


    return (
        <div className='flex flex-col justify-center'>
            <CustomButton
                buttonText="Back to Appointments"
                onClick={() => {
                    router.push("/visits");
                }}
            />
            <div className="bg-gray-100 rounded-lg flex flex-col items-center gap-4 max-w-lg self-center sm:px-4 md:min-w-full">

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
            <div className='p-6 flex flex-col gap-4 FORM'>

                <div className='flex flex-col' id='DIAGNOSIS'>
                    <TextField
                        fullWidth
                        required
                        label="Diagnosis"
                        value={diagnosis}
                        onChange={(v) => setDiagnosis(v.target.value)}
                    />
                </div>

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
                                id="as"
                                value={selectedTest}
                                input={<OutlinedInput label="Tests" />}
                                onChange={(v) => setSelectedTest(Number(v.target.value))}
                            >
                                {testsNames?.map((test) => (
                                    <MenuItem key={test.code} value={test.code}>{test.type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <CustomButton
                            buttonText="Order"
                            onClick={() => {
                                orderTestAsDoctor(visitInfo.visitId, selectedTest, doctorNoteOnTest)
                                setSelectedTest('')

                            }}
                        />
                    </div>
                    {selectedTest &&
                        <TextField
                            fullWidth
                            multiline
                            placeholder='Note to the lab assistant'
                            onChange={(v) => setDoctorNoteOnTest(v.target.value)
                            }
                        />
                    }
                </div>

                <div className='flex flex-col gap-2' id='EXAMS'>
                    <div className='flex flex-row gap-2 EXAMINATION'>
                        <FormControl fullWidth className=''>
                            <InputLabel id="Exams">Physical Examinations</InputLabel>
                            <Select
                                labelId="Exams"
                                id="asgf"
                                value={selectedExamination}
                                input={<OutlinedInput label="Physical Examinations" />}
                                onChange={(v) => setSelectedExamination(Number(v.target.value))}
                            >
                                {testsNames?.map((test) => (
                                    <MenuItem key={test.code} value={test.code}>{test.type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <CustomButton
                            buttonText="Perform"
                            onClick={() => {
                                createExamination(visitInfo.visitId, selectedExamination)
                                setSelectedExamination('')
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
                    
                <div className='flex gap-4' id='BUTTONS'>
                    <CustomButton
                        buttonText="Visit Completed"
                        onClick={() => console.log("s")}
                    />

                    <CustomButton
                        buttonText="Cancel Visit"
                        onClick={() => console.log("s")}
                        color='red'
                    />

                </div>
            </div>
        </div>
    )
}