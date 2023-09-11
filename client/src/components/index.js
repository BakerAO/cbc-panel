import React, { useEffect, useState } from 'react'
import api from '../data/api'
import socket from '../data/socket'
import Panel from './Panel'
import DayChooser from './DayChooser'
import ActiveDoctors from './ActiveDoctors'
import ResetAll from './ResetAll'
import Grid from './Grid'

export default function App() {
  const [weekday, setWeekday] = useState('monday')
  const [dayValues, setDayValues] = useState([])
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    const getDoctors = async () => {
      const doctorsRes = await api.get('/doctors')
      setDoctors(doctorsRes.data)
    }

    getDoctors()
    socket.on('updateDoctors', (ioDocs) => {
      setDoctors(ioDocs)
    })
    socket.on('activeDay', (ioDay) => {
      setWeekday(ioDay)
    })
  }, [])

  useEffect(() => {
    const getDayValues = async () => {
      const values = await api.get(`/times/${weekday}`)
      setDayValues(values.data)
    }

    getDayValues()
  }, [weekday])

  const updateActive = async (doctor) => {
    await api.post('/active', { id: doctor.id, active: !doctor[weekday], weekday })
  }

  const activeDoctors = () => {
    return doctors.filter(d => {
      if (d[weekday]) return d[weekday]
      else return false
    })
  }

  return (
    <div style={{ height: '200vh', width: '100vw' }}>
      <Grid
        dayValues={dayValues}
        doctors={activeDoctors()}
        weekday={weekday}
      />
      <ActiveDoctors
        doctors={doctors}
        handleClick={updateActive}
        weekday={weekday}
      />
      <DayChooser weekday={weekday} />
      {/*
        <SaveDefaults />
      */}
      {/* <ResetAll
        handleResetAll={this.handleResetAll}
      /> */}
    </div>
  )
}
