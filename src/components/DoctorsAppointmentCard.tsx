import React from 'react';

// Used by Doctor ONLY

const DoctorsAppointmentCard = ({ time, patient, tag }) => {
    const tagColors = {
      scheduled: 'bg-green-500 text-white',
      inProgress: 'bg-yellow-500 text-white',
      completed: 'bg-blue-500 text-white',
      canceled: 'bg-red-500 text-white',
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
        <div>
          <span className="text-blue-500 text-sm block">{time}</span>
          <h2 className="text-lg font-bold">{patient}</h2>
        </div>
        <div className={`rounded-full py-1 px-2 text-xs font-bold ${tagColors[tag]}`}>
          {tag}
        </div>
        <button className="bg-gray-200 rounded-lg px-4 py-2 text-sm font-bold">Open Details</button>
      </div>
    );
  };

  export default DoctorsAppointmentCard;