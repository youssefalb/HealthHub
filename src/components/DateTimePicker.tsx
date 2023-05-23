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

    const fullyTakenDaysWith32Slots = fullyTakenDays.filter((day) => day.count === 2);
    return fullyTakenDaysWith32Slots.map((day) => day.date);
}

export default function DateAndTimePicker({ doctor, takenSlots, saveTime, saveDate }) {
    const fullyTakenDays = getFullyTakenDays(takenSlots);
    console.log(fullyTakenDays);

    const handleChangeTime = (value) => {
        let time = dayjs(value.$d).format('THH:mm:ss.sss[Z]')
        saveTime(time)
    };

    const handleChangeDate = (value) => {
        let date = dayjs(value.$d).format('YYYY-MM-DD')
        saveDate(date)
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
                        // onMonthChange={}
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
