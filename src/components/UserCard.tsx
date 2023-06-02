import React, {useState } from "react";
import PopupDialog from "./PopupDialog";
import { banUser, unbanUser } from "@/lib/manageUsers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCard = ({ id, name, surname, role, nationalID, isActive }) => {

  const [confirmBanUserPopUpShown, setConfirmBanUserPopUpShown] = useState(false);
  const [confirmUnbanUserPopUpShown, setConfirmUnbanUserPopUpShown] = useState(false);
  const [activeState, setActiveState] = useState(isActive);


  const handleBanClick = () => {
    setConfirmBanUserPopUpShown(true);
  }

  const handleUnbanClick = () => {
    setConfirmUnbanUserPopUpShown(true);
  }

  const handleBanUser = async () => {
    setConfirmBanUserPopUpShown(false);
    const response = await banUser(id);
    if (response.success) {
      toast.success("User has been banned successfully.");
      setActiveState(false);
      
    } else {
      toast.error("Failed to ban user. Please try again.");
    }
  };

  const handleUnbanUser = async () => {
    setConfirmUnbanUserPopUpShown(false);
    const response = await unbanUser(id);
    if (response.success) {
      toast.success("User has been unbanned successfully.");
      setActiveState(true);
    } else {
      toast.error("Failed to unban user. Please try again.");
    }
  };

  return (

    <div className="cursor-pointer">
      <PopupDialog
        open={confirmBanUserPopUpShown}
        onClose={() => setConfirmBanUserPopUpShown(false)}
        title="Are you sure!"
        message="Before that. Are you sure you want to ban this user?"
        onConfirm={handleBanUser}
      />
      <PopupDialog
        open={confirmUnbanUserPopUpShown}
        onClose={() => setConfirmUnbanUserPopUpShown(false)}
        title="Are you sure!"
        message="Before that. Are you sure you want to unban this user?"
        onConfirm={handleUnbanUser}
      />
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
          {activeState ? (
            <button onClick={handleBanClick} className="ml-2">
              <img src="/images/active-user.png"
                alt="Ban Icon" className="h-10 w-10"
                title="Ban User" />
            </button>
          ) : (
            <button onClick={handleUnbanClick} className="ml-2">
              <img src="/images/banned-user.png"
                alt="Unban Icon" className="h-10 w-10"
                title="Unban User" />
            </button>
          )

          }
        </div>
      </div>

    </div>
  );
};

export default UserCard;
