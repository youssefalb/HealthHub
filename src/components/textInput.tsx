import React from 'react';

const TextInput = ({ label, value,type, onChange }) => {
  return (
    <div className="mb-4">
          <label className="block mb-1" htmlFor={label}>
          {label}
          </label>
          <input
            className="bg-gray-100 border border-gray-150 p-2 rounded-lg w-full "
            type={type}
            id={label}
            value={value}
            onChange={onChange}
          />
        </div>
  );
};

export default TextInput;
