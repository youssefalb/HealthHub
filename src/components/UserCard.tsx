import React from "react";

const UserCard = ({ id, name, surname, role, nationalID }) => {

  const redirectFun = () => {
  }


  const handleBanUser = () => {
    //Baning user coming soon
    //some pop_up to confirm ban and then ban the wonderful user
  }

  return (
    <div className="cursor-pointer">
      <div className="bg-white hover:bg-gray-100 rounded-lg shadow-md p-6 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <span className="text-gray-80 text-sm font-semibold">{name} {surname} ({role})</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative rounded-full text-white p-5 bg-blue-500 font-semibold w-30 h-10 flex items-center justify-center">
            <span className="text-sm">ID: {nationalID}</span>
          </div>
          <button onClick={handleBanUser} className="ml-2">
            <img src="/images/ban-user.png"
              alt="Ban Icon" className="h-10 w-10"
              title="Ban User" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
