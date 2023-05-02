import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const availableDates = [
  new Date('2023-05-04'),
  new Date('2023-05-06'),
  new Date('2023-05-08'),
];

const availableTimes = [
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM' },
  { value: '01:00 PM', label: '01:00 PM' },
  { value: '02:00 PM', label: '02:00 PM' },
  { value: '03:00 PM', label: '03:00 PM' },
  { value: '04:00 PM', label: '04:00 PM' },
];

const DateTimePicker = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const isDateAvailable = (date) => {
    return availableDates.some((availableDate) => {
      return availableDate.toDateString() === date.toDateString();
    });
  };

  const isTimeAvailable = (time) => {
    return availableTimes.some((availableTime) => {
      return availableTime.value === time;
    });
  };

  const disableDates = (date) => {
    return !isDateAvailable(date);
  };

  const disableTimes = (time) => {
    return !isTimeAvailable(time);
  };

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker"
          label="Date picker"
          value={selectedDate}
          onChange={handleDateChange}
          shouldDisableDate={disableDates}
          autoOk={true}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedTime}
          onChange={handleTimeChange}
          disabled={!selectedDate}
          //shouldDisableTime={disableTimes}
        >
          {availableTimes.map((time) => (
            <option key={time.value} value={time.value}>
              {time.label}
            </option>
          ))}
        </KeyboardTimePicker>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DateTimePicker;
