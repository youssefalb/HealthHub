import React, { useState } from "react";
import PopupDialog from "./PopupDialog";
import { banUser, unbanUser } from "@/lib/manageUsers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCard = ({ id, name, surname, role, nationalID, isActive }) => {

  const [activeState, setActiveState] = useState(isActive);

  return (

    <div className="cursor-pointer">
      <div className="bg-white hover:bg-gray-100 rounded-lg shadow-md p-6 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <span className="text-gray-80 text-sm font-semibold">{name} {surname} </span>
          </div>
        </div>
        <div className="relative rounded-full text-white p-5 bg-gray-500 font-semibold w-30 h-10 flex items-center justify-center">
          <span className="text-sm">{role}</span>
        </div>
        <div>
          <span className="text-gray-80 text-sm font-normal">{nationalID} </span>
        </div>
        {activeState ? (
          <span className="ml-2">
            <img
              src="/images/active-user.png"
              alt="Ban Icon"
              className="h-10 w-10"
              title="Ban User"
            />
          </span>
        ) : (
          <span className="ml-2">
            <img
              src="/images/banned-user.png"
              alt="Unban Icon"
              className="h-10 w-10"
              title="Unban User"
            />
          </span>
        )}
      </div>
        <div className="flex items-center">
      </div>

    </div>
  );
};

export default UserCard;
