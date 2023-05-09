import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { DayCalendarSkeleton } from '@mui/x-date-pickers';
import { useEffect } from 'react';

const today = dayjs();
const tomorrow = dayjs('2023-05-20')
const twoPM = dayjs().set('hour', 14).startOf('hour');
const threePM = dayjs().set('hour', 19).startOf('hour');

const isWeekend = (date: Dayjs) => {
  const day = date.day();

  return day === 0 || day === 6;
};

const dayFormatter = (day: string)  => { return day.toUpperCase() }

export default function DateAndTimePicker(props) {

  const {doctorId} = props
  console.log("hi", doctorId)
  const fetchData = async () => {

  }

  
  useEffect(() => {
    
  })


  return (
      <Grid
        container
        columns={{ xs: 1, lg: 2 }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
        <DateCalendar
          dayOfWeekFormatter={dayFormatter}
          defaultValue={today}
          disablePast
          shouldDisableDate={isWeekend}
          renderLoading={() => <DayCalendarSkeleton />}
          // onMonthChange={}
          // onChange={}
          //todo on change
          //todo set isloading when fetching data
        />
        </Grid>
        <Grid item>
          <TimeClock defaultValue={twoPM} maxTime={threePM} />
        </Grid>
      </Grid>
  );
}
