import React from 'react'
import api from '../data/api'

const getColor = (status) => {
  switch (status) {
    case 0:
      return 'white'
    case 1:
      return 'red'
    case 2:
      return 'yellow'
    case 3:
      return 'green'
    case 4:
      return 'blue'
    case 5:
      return 'grey'
    case 6:
      return 'orange'
    default:
      return ''
  }
}

export default function Column(props) {
  const { doctor, timeValues, weekday } = props

  const updateTime = async (id, doctorId, status) => {
    await api.post(`/times/${weekday}`, { id, doctorId, status})
  }

  const renderCells = () => {
    const cells = []
    for (const tv of timeValues) {
      cells.push(
        <div
          className="row border"
          key={`${doctor.id}-${tv.id}`}
          style={{
            backgroundColor: getColor(tv.status),
            height: '48px'
          }}
          onClick={() => updateTime(tv.id, doctor.id, tv.status++)}
        />
      )
    }
    return cells
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
          {doctor.name}
        </div>
        {this.renderCells()}
      </div>
  )
}
