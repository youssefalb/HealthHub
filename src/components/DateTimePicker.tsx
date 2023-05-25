import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton, StaticTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { getTakenAppointments } from '@/lib/bookings';
import { warn } from 'console';

const today = dayjs();
// const tomorrow = dayjs('2023-05-20')
const twoPM = dayjs().set('hour', 14).startOf('hour');
const maxTime = dayjs().set('hour', 17).startOf('hour');
const minTime = dayjs().set('hour', 9).startOf('hour');


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



export default function DateAndTimePicker({ doctor, year, month, saveTime, saveDate, changeMonth, changeYear }) {
    // const fullyTakenDays = getFullyTakenDays(takenSlots);
    // console.log(fullyTakenDays);

    const [selectedMonth, setSelectedMonth] = useState()
    const [selectedYear, setSelectedYear] = useState()
    const [selectedTime, setSelectedTime] = useState()
    const [initialTime, setInitialTime] = useState(twoPM)
    const [selectedDate, setSelectedDate] = useState()
    const [fullDays, setFullDays] = useState([])
    const [takenTimeSlots, setTakenTimeSlots] = useState({})

    const shouldDisableTime = (value) => {
        let disable = false
        if (takenTimeSlots)
            for (const [key, times] of Object.entries(takenTimeSlots)) {
                times.forEach((time) => {
                    if (key == dayjs(selectedDate).format('DD') && time == dayjs(value).format('HH-mm')){
                        disable = true
                    }
                })
            }
        return disable;
    }

    const shouldDisableDate = (date: Dayjs) => {
        const day = date.day();
        let disable = false
        if (fullDays)
            fullDays.forEach(element => {
                if (date["$D"] == element) {
                    disable = true
                }
            });
        return day === 0 || day === 6 || disable;
    };

    function getFullyTakenDays(takenAppointments) {
        let results = []
        if (takenAppointments) {
            const daysWithAppointments = takenAppointments.map(date => dayjs(date.date)['$D'])

            const appointmentsInEachDay = daysWithAppointments.reduce((count, day) => {
                count[day] = (count[day] || 0) + 1
                return count
            }, {})

            if (appointmentsInEachDay)
                for (const [key, value] of Object.entries(appointmentsInEachDay)) {

                    if (value > 2)
                        results.push(key)

                }
        }
        return results
    }

    function getBusyTimeSlots(takenAppointments) {
        let days = {}
        if (takenAppointments) {
            takenAppointments.forEach((date) => {
                const keyDay = dayjs(date.date)['$D']
                if (!days.hasOwnProperty(keyDay)) {
                    days[keyDay] = []
                }
                days[keyDay].push(dayjs(date.date).format('HH-mm'))
            })
        }
        return days
    }

    const getDoctorBusySlots = async (id: String, year: number, month: number) => {
        const results = await getTakenAppointments(id, year, month)
        const busySlots = await results.json()
        console.log("busy Slots: ", busySlots.data)
        setFullDays(getFullyTakenDays(busySlots.data))
        setTakenTimeSlots(getBusyTimeSlots(busySlots.data))
        return busySlots
    }

    useEffect(() => {
        getDoctorBusySlots(doctor.employeeId, year, month)
    }, [selectedMonth, selectedYear])


    const handleChangeTime = (value) => {
        let time = dayjs(value.$d).format('HH:mm')
        saveTime(time)
    };

    const handleChangeDate = (value) => {
        let date = dayjs(value.$d).format('YYYY-MM-DD')
        let month = Number(value.$M)
        let year = Number(value.$y)
        // console.log(month)
        saveDate(date)
        changeYear(year)
        changeMonth(month)
        setSelectedMonth(month)
        setSelectedYear(year)
        setSelectedDate(date)
        setSelectedTime(initialTime)
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
                        shouldDisableDate={shouldDisableDate}
                        // renderLoading={() => <DayCalendarSkeleton />}
                        onMonthChange={handleChangeDate}
                        onYearChange={handleChangeDate}
                        onChange={handleChangeDate}
                    //todo on change
                    //todo set isloading when fetching data
                    />
                </Grid>
                <Grid item>
                    <StaticTimePicker
                        ampm={false}
                        orientation="landscape"
                        defaultValue={twoPM}
                        // value = {selectedTime}
                        shouldDisableTime={shouldDisableTime}
                        minutesStep={30}
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
