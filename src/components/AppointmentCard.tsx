import { Role } from "@prisma/client";
import React from "react";

// Used by Patient and Registrar

const AppointmentCard = ({ appointment, role }) => {
    const rawdate = new Date(appointment.date);
    const date = rawdate.toDateString();
    const description = appointment.description;
    let name: String | null

    if (role == Role.PATIENT)
        name = "Dr. " + appointment.doctor?.user?.firstName + " " + appointment.doctor?.user?.lastName;
    else if (role == Role.DOCTOR)
        name = appointment.patient?.user?.firstName + " " + appointment.patient?.user?.lastName;
    // console.log(appointment)

    return (
        <div className="bg-white rounded-lg hover:bg-gray-100 shadow-md p-6 flex items-center justify-between">
            <div className="flex items-center">
                <div>
                    <span className="text-blue-500 text-sm block">{date}</span>
                    <h2 className="text-lg font-bold">{name}</h2>
                    <span className="text-gray-500 text-sm">{description}</span>
                </div>
            </div>
            <div className="flex items-center">
                <div className="rounded-full text-white p-5 bg-blue-500 font-semibold w-30 h-10 flex items-center justify-center mr-24">
                    <span>{appointment.status}</span>
                </div>
                <button className="rounded-full w-10 h-10 flex items-center justify-center mr-2">
                    <img
                        src="/images/info.png"
                        alt="More Info Icon"
                        className="h-11 w-11"
                    />
                </button>
                <button className="rounded-full w-10 h-10 flex items-center justify-center">
                    <img
                        src="/images/cancel.png"
                        alt="Cancel Booking Icon"
                        className="h-11 w-11"
                    />
                </button>
            </div>
        </div>
    );
};

export default AppointmentCard;
