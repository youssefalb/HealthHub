import React from 'react';

const LongTextInput = ({ id, label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="bg-gray-100 border border-gray-150 p-2 rounded-lg w-full"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default LongTextInput;
