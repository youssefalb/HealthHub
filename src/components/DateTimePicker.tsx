import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton, StaticTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { getTakenAppointments } from '@/lib/bookings';

const today = dayjs();
// const tomorrow = dayjs('2023-05-20')
const twoPM = dayjs().set('hour', 14).startOf('hour');
const maxTime = dayjs().set('hour', 17).startOf('hour');
const minTime = dayjs().set('hour', 9).startOf('hour');

const isWeekend = (date: Dayjs) => {
    const day = date.day();
    return day === 0 || day === 6;
};

const dayFormatter = (day: string) => { return day.toUpperCase() }

//NOTE: do it
// function getFullyTakenDays(takenSlots) {
//     const fullyTakenDays = takenSlots.reduce((result, slot) => {
//         const date = slot.toDateString(); // Extract the date component from the slot
//         const dayEntry = result.find((entry) => entry.date === date);
//
//         if (dayEntry) {
//             dayEntry.count++;
//         } else {
//             result.push({ date: date, count: 1 });
//         }
//
//         return result;
//     }, []);

//     const fullyTakenDaysWith32Slots = fullyTakenDays.filter((day) => day.count === 2);
//     return fullyTakenDaysWith32Slots.map((day) => day.date);
// }



export default function DateAndTimePicker({ doctor, month,  saveTime, saveDate, changeMonth }) {
    // const fullyTakenDays = getFullyTakenDays(takenSlots);
    // console.log(fullyTakenDays);

  const [selectedMonth, setSelectedMonth] = useState()
  const [selectedTime, setSelectedTime] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [fullDays, setFullDays] = useState([])
  const [takenTimeSlots, setTakenTimeSlots] = useState([])
  
  function getFullyTakenDays(takenAppointments) {
  if (!Array.isArray(takenAppointments)) {
    console.error("takenAppointments should be an array.");
    return [];
  }
  console.log("hellooo mfs I am bored")
  const fullyTakenDays = takenAppointments.reduce((result, slot) => {
    const date = slot.toDateString(); // Extract the date component from the slot
    const dayEntry = result.find((entry) => entry.date === date);

    if (dayEntry) {
      dayEntry.slots.push(slot);
    } else {
      result.push({ date, slots: [slot] });
    }

    console.log("fullyTakenDays:", result);
    return result;
  }, []);

  return fullyTakenDays;
}

  const fetchstuff = async (id: String, month: number)=> {
    const results = await getTakenAppointments(id, month)
    console.log("var : ", id, " type : ", typeof (id))
    console.log("var : " , month, " type : ", typeof(month))
    
    let jh = JSON.stringify(results)
    console.log("zeftttttttt", jh)
    return jh
  }
  
  useEffect(() => {
    console.log("doctor : ", doctor)
    const results = fetchstuff(doctor.employeeId, month)
    console.log("results of fetching: ", results)
    setFullDays(getFullyTakenDays(results))
    console.log("full Days: ", fullDays)
  }, [selectedMonth])
  

  const handleChangeTime = (value) => {
        let time = dayjs(value.$d).format('THH:mm:ss.sss[Z]')
        saveTime(time)
    };

    const handleChangeDate = (value) => {
        let date = dayjs(value.$d).format('YYYY-MM-DD')
        let month = dayjs(value.$d).format('MM')
        // console.log(month)
        saveDate(date)
        changeMonth(month)
    };

    return (
        <div>
            <label className="block mb-2" htmlFor="date">
                Choose a Date*
            </label>
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
                        // renderLoading={() => <DayCalendarSkeleton />}
                        onMonthChange={handleChangeDate}
                        onChange={handleChangeDate}
                    //todo on change
                    //todo set isloading when fetching data
                    />
                </Grid>
                <Grid item>
                    <StaticTimePicker
                        orientation="landscape"
                        defaultValue={twoPM}
                        minutesStep={15}
                        minTime={minTime}
                        maxTime={maxTime}
                        onChange={handleChangeTime}
                        slots={{
                            actionBar: () => null,
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
