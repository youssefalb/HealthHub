import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { getTakenAppointments } from '@/lib/bookings';

const today = dayjs();
// const tomorrow = dayjs('2023-05-20')
const maxTime = dayjs().set('hour', 17).startOf('hour');
let minTime = dayjs().set('hour', 9).startOf('hour');

const dayFormatter = (day: string) => { return day.toUpperCase() }

export default function DateAndTimePicker({ doctor, saveTime, saveDate, date }) {
    const [selectedDate, setSelectedDate] = useState(date)
    const [fullDays, setFullDays] = useState([])
    const [takenTimeSlots, setTakenTimeSlots] = useState({})
    const [clockDisabled, setClockDisabled] = useState(true)

    const shouldDisableTime = (value) => {
        let disable = false
        if (takenTimeSlots)
            for (const [key, times] of Object.entries(takenTimeSlots)) {
                Array(times).forEach((time) => {
                    if (key == dayjs(selectedDate).format('DD') && time == dayjs(value).format('HH-mm')) {
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

                    if (Number(value) > 17)
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

    const getDoctorBusySlots = async (id: String) => {
        const results = await getTakenAppointments(id, Number(dayjs(selectedDate).format('YYYY')), Number(dayjs(selectedDate).format('MM')) - 1)
        const busySlots = await results.json()
        setFullDays(getFullyTakenDays(busySlots.data))
        setTakenTimeSlots(getBusyTimeSlots(busySlots.data))
        return busySlots
    }

    useEffect(() => {
        console.log("doctor from time picker", doctor)
        getDoctorBusySlots(doctor.employeeId)
    }, [selectedDate])


    const handleChangeTime = (value) => {
        let time = dayjs(value.$d).format('HH:mm')
        saveTime(time)
    };

    const handleChangeDate = (value) => {
        let date = dayjs(value.$d).format('YYYY-MM-DD')
        console.log(date, today.format('YYYY-MM-DD'))
        if (date == today.format('YYYY-MM-DD') && minTime.format('HH') < today.format('HH')) {
            minTime = today;
        } else {
            minTime = dayjs().set('hour', 9).startOf('hour');
        }
        saveDate(date)
        setSelectedDate(date)
        setClockDisabled(false)
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
                        disablePast
                        shouldDisableDate={shouldDisableDate}
                        onMonthChange={handleChangeDate}
                        onYearChange={handleChangeDate}
                        onChange={handleChangeDate}
                    />
                </Grid>
                <Grid item>
                    <StaticTimePicker
                        ampm={false}
                        orientation="landscape"
                        shouldDisableTime={shouldDisableTime}
                        disabled={clockDisabled}
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
