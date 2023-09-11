import React, { useEffect, useState } from 'react'
import api from '../data/api'
import socket from '../data/socket'
import Grid from './Grid'

export default function Panel(props) {
  const { dayValues, doctorIds } = props

  // const updateTimes = async (doctor, time) => {
  //   if (doctor.times[time] > 5) doctor.times[time] = 0
  //   else doctor.times[time]++
  //   await api.post('/times', { id: doctor.id, times: JSON.stringify(doctor.times) })
  // }

  // const handleResetAll = async () => {
  //   const { doctors } = this.state
  //   for (let i = 0; i < doctors.length; i++) {
  //     await api.post('/times', { id: doctors[i].id, times: JSON.stringify(doctors[i].default_times) })
  //   }
  // }


  // componentDidMount() {
  //   socket.on('update', (ioDoc) => {
  //     try {
  //       const doctors = clone(this.state.doctors)
  //       for (const i in doctors) {
  //         if (ioDoc.id === doctors[i].id) {
  //           if (ioDoc.times) ioDoc.times = JSON.parse(ioDoc.times)
  //           doctors[i] = { ...doctors[i], ...ioDoc }
  //         }
  //       }
  //       this.setState({ doctors })
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   })
  // }

  return (
    <div style={{ width: '100vw', height: '200vh' }}>
      <Grid
        doctors={this.state.doctors}
        updateTimes={this.updateTimes}
      />
    </div>
  )
}

// export default Panel
