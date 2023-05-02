// import { useState } from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Typography } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import React, { useState } from 'react';

const availableDates = [
  new Date("2022-06-01T10:00:00.000Z"),
  new Date("2022-06-01T11:00:00.000Z"),
  new Date("2022-06-01T12:00:00.000Z"),
  new Date("2022-06-02T13:00:00.000Z"),
  new Date("2022-06-02T14:00:00.000Z"),
  new Date("2022-06-02T15:00:00.000Z"),
];

const MyDateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const isDateAvailable = (date) => {
    return availableDates.some((availableDate) => {
      return (
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate() &&
        availableDate.getHours() === date.getHours()
      );
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Select a date and time:
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <DateTimePicker
        value={selectedDate}
        onChange={handleDateChange}
        label="Select Date and Time"
        inputVariant="outlined"
        ampm={false}
        disablePast
        shouldDisableDate={(date) => !isDateAvailable(date)}
      />
      </MuiPickersUtilsProvider>
      
      
    </div>
  );
};

export default MyDateTimePicker;
