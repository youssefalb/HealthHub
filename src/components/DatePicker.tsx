import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold" htmlFor="date">
        Select a date:
      </label>
      <DatePicker
        id="date"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="border border-gray-400 p-2 rounded-lg w-full"
      />
    </div>
  );
};

export default CustomDatePicker;
