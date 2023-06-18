import { Role } from "@prisma/client";
import React from "react";

const MessageCard = ({message, role}) => {
  const rawdate = new Date(message.dateCreated);
  const date = rawdate.toDateString();
  let content = message.content;
  if(content.length + 3 >= 40)
      content = content.slice(0,40)+ "..."
  let name: String | null

  if(role == Role.PATIENT)
      name = "Dr. " + message.doctor?.user?.firstName + " " + message.doctor?.user?.lastName;
  else if(role == Role.DOCTOR)
      name = message.patient?.user?.firstName + " " + message.patient?.user?.lastName;

  return (
    <div className="bg-white rounded-lg hover:bg-gray-100 shadow-md p-6 flex items-center justify-between">
      <div className="flex items-center">
        <div>
          <span className="text-blue-500 text-sm block">{date}</span>
          <h2 className="text-lg font-bold">{content}</h2>
          <span className="text-gray-500 text-sm">{name}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
