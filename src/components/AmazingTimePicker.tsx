/**
 * 
 * Works exactly the same way as my AmazingDatePicker, read its comments for more info
 * 
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

const CustomTimePicker = ({ times, onTimeSelected }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);

  const handlePrevPage = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const handleNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handleTimeSelected = (index) => {
    setSelectedTimeIndex(index);
    onTimeSelected(times[index]);
  };

  const startIndex = currentPageIndex * getNumVisibleTimes();
  const endIndex = startIndex + getNumVisibleTimes();
  const visibleTimes = times.slice(startIndex, endIndex);

  function getNumVisibleTimes() {
    return 5;
    // if (window.innerWidth >= 1024) {
    //   return 8;
    // } else if (window.innerWidth >= 768) {
    //   return 6;
    // } else {
    //   return 4;
    // }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
          disabled={currentPageIndex === 0}
          onClick={handlePrevPage}
        >
          <svg
            className="w-4 h-4 stroke-current text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex flex-wrap">
          {visibleTimes.map((time, index) => (
            <button
              key={startIndex + index}
              className={`p-3 mr-2 mb-2 rounded-lg ${
                startIndex + index === selectedTimeIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handleTimeSelected(startIndex + index)}
            >
              <p className="text-sm font-medium">{time}</p>
            </button>
          ))}
        </div>
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
          disabled={endIndex >= times.length}
          onClick={handleNextPage}
        >
          <svg
            className="w-4 h-4 stroke-current text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

CustomTimePicker.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onTimeSelected: PropTypes.func.isRequired,
};

export default CustomTimePicker;
