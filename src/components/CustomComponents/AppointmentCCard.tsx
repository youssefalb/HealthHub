

function AppointmentCard({ date, doctorName, specialization }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <span className="text-blue-500 text-sm block">{date}</span>
            <h2 className="text-lg font-bold">{doctorName}</h2>
            <span className="text-gray-500 text-sm">{specialization}</span>
          </div>
        </div>
        <div className="flex items-center">
          <button className="rounded-full w-10 h-10 flex items-center justify-center mr-2">
            <img src="/images/info.png" alt="More Info Icon" className="h-11 w-11" />
          </button>
          <button className="rounded-full w-10 h-10 flex items-center justify-center">
            <img src="/images/cancel.png" alt="Cancel Booking Icon" className="h-11 w-11" />
          </button>
        </div>
      </div>
    );
  }