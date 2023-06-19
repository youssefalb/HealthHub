import React from "react";
import { Role } from '@prisma/client';

// Used by Patient and Registrar

const TestCard = ({ test, role }) => {
    const rawdate = new Date(test.dateOfExecutionXorCancelling);
    const date = rawdate.toDateString();
    let doctorNote = test.doctorNote;
    let testName = test.examinationDictionary.name
    if (doctorNote.length + 3 >= 40)
        doctorNote = doctorNote.slice(0, 40) + "..."

    const status = test.status;

    const displayStatus = (role == Role.DOCTOR || role == Role.LAB_ASSISTANT || role == Role.LAB_SUPERVISOR)

    return (
        <div className="cursor-pointer">
            <div className="bg-white hover:bg-gray-100 rounded-lg shadow-md p-6 flex items-center justify-between">
                <div className="flex items-center">
                    <div>
                        <h2 className="text-lg font-bold">{testName}</h2>
                        <span className="text-gray-500 text-sm">{doctorNote}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="rounded-full text-white p-5 bg-blue-500 font-semibold w-30 h-10 flex items-center justify-center mr-24">
                        {displayStatus ? (
                            <span>{status}</span>
                        ) : (
                            <span className="text-sm block">{date}</span>
                        )}
                    </div>
                    <div className="rounded-full w-10 h-10 flex items-center justify-center mr-2">
                        <img
                            src="/images/info.png"
                            alt="More Info Icon"
                            className="h-11 w-11"
                        />
                    </div>
                    {/*<button className="rounded-full w-10 h-10 flex items-center justify-center">
               <img
                 src="/images/cancel.png"
                 alt="Cancel Booking Icon"
                 className="h-11 w-11"
               />
            </button>*/}
                </div>
            </div>
        </div>
    );
};

export default TestCard;
