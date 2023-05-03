/**
 
CustomDatePicker

Props:
- dates: an array of objects representing dates with the following shape: { day: number, month: string }
- onDateSelected: a function to be called when a date is selected, it receives the selected date object as an argument

Usage:
import CustomDatePicker from './CustomDatePicker';

<CustomDatePicker dates={...} onDateSelected={...} />

This component renders a date picker with a set of dates. The user can select a date and the selected date will be highlighted. The number of visible dates in the picker changes depending on the width of the screen.

Note: Make sure to pass an array of date objects to the dates prop with each date object having the following shape: { day: number, month: string }. Also, pass a function to the onDateSelected prop which will be called when a date is selected and will receive the selected date object as an argument.

 */



import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CustomDatePicker = ({ dates, onDateSelected }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [numVisibleDates, setNumVisibleDates] = useState(getNumVisibleDates());

  useEffect(() => {
    function handleResize() {
      setNumVisibleDates(getNumVisibleDates());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevPage = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const handleNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handleDateSelected = (index) => {
    setSelectedDateIndex(index);
    onDateSelected(dates[index]);
  };

  const startIndex = currentPageIndex * numVisibleDates;
  const endIndex = startIndex + numVisibleDates;
  const visibleDates = dates.slice(startIndex, endIndex);

 
  // window.innerWight was crashing and I didnt want to fix it so..
  function getNumVisibleDates() {
    return 5;
    // if (window.innerWidth >= 1024) {
    //   return 10;
    // } else if (window.innerWidth >= 768) {
    //   return 7;
    // } else {
    //   return 5;
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
          {visibleDates.map((date, index) => (
            <button
              key={startIndex + index}
              className={`px-4 py-2 mr-2 mb-2 rounded-full ${
                startIndex + index === selectedDateIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handleDateSelected(startIndex + index)}
            >
              <p className="text-sm font-medium">{date.day}</p>
              <p className={`text-xs ${
                startIndex + index === selectedDateIndex
                ? "text-gray-200"
                : "text-gray-500"
              }`}>{date.month}</p>
            </button>
          ))}
        </div>
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
          disabled={endIndex >= dates.length}
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
      <div className="flex-grow" />
    </div>
  );
};

CustomDatePicker.propTypes = {
  dates: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      month: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDateSelected:
 PropTypes.func.isRequired,
};

export default CustomDatePicker;
