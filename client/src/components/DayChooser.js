import React from 'react'
import Button from './common/Button'
import socket from '../data/socket'

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  day: {
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
  },
}

export default function DayChooser(props) {
  const { weekday } = props

  const handleClick = (activeDay) => {
    socket.to('ovcRoom').emit('activeDay', activeDay)
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  
  const renderDays = () => {
    const result = [];
    for (const day of days) {
      let color = 'gray'
      if (weekday === day) color = 'blue'
      result.push(
        <div style={styles.day} key={day}>
          <Button
            color={color}
            label={day[0].toUpperCase() + day.slice(1)}
            handleClick={() => handleClick(day)}
            fontSize={20}
          />
        </div>
      )
    }

    return result;
  }

  return (
    <div style={styles.main}>
      {renderDays()}
    </div>
  )
}
