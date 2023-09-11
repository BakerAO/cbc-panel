import React from 'react'
import timesJSON from '../data/times.json'

export default function Times() {
  const times = timesJSON.times

  const renderTime = (time) => {
    return (
      <div
        className="row center middle border"
        key={time}
        id={time}
        style={{
          height: '48px'
        }}
      >
        {time}
      </div>
    )
  }

  return (
    <div className="col">
      <div
        className="row center middle border"
        style={{
          height: '48px',
          textAlign: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: 'white'
        }}
      >
        Appointment
      </div>
      {times.map(t => renderTime(t))}
    </div>
  )
}

