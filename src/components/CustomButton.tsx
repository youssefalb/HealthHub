import React from 'react';

const CustomButton = ({ buttonText, onClick = () => { }, color = 'blue' }) => {
  const colorVariants = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    red: 'bg-red-500 hover:bg-red-600'
  }
  
  return (
    <button
      className={` ${colorVariants[color]}  text-white py-2 px-4 rounded-3xl my-2 max-w-xs mx-auto inline-block`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default CustomButton;