import React from 'react';
// Note that some proprities may be deleted later on
//Or we can create more then one button component
const CustomButton = ({buttonText, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default CustomButton;