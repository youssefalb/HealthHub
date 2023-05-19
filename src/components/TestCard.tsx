import { Role } from "@prisma/client";
import React from "react";

// Used by Patient and Registrar

const TestCard = ({test, role}) => {
//   const rawdate = new Date(test.date);
//   const date = rawdate.toDateString();
  const description = test.doctorNote;



  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
      <div className="flex items-center">
        <div>
          <span className="text-gray-80 text-sm font-semibold">{description}</span>
        </div>
      </div>
      <div className="flex items-center">
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

export default TestCard;
