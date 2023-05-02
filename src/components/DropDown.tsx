import { useState } from 'react';

const Dropdown = ({ label, items, selectedItem, onSelectedChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item) => {
    onSelectedChange(item);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4">
      <label className="block mb-1">{label}</label>
      <div className="relative">
        <div
          className="bg-gray-100 flex justify-between items-center border border-gray-150 rounded-lg p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex-1 truncate">{selectedItem}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform ${
              isOpen ? '-rotate-180' : ''
            } transition-transform`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.293 7.293a1 1 0 0 0-1.414-1.414L10 9.586 5.707 5.293a1 1 0 0 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l5-5z"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg">
            {items.map((item) => (
              <div
                key={item}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
