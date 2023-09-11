import React from 'react'
import Column from './Column'
import Times from './Times'

const styles = {
  grid: {
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
  }
}

export default function Grid(props) {
  const { dayValues, doctors, weekday } = props

  const renderGrid = () => {
    const items = []
    for (const d of doctors) {
      const timeValues = dayValues.filter(dv => dv.doctorId === d.id)
      items.push(
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }} key={d.id}>
          <Column
            doctor={d}
            timeValues={timeValues}
            weekday={weekday}
          />
        </div>
      )
    }

    return items
  }
  

  return (
    <div style={styles.grid}>
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Times />
        </div>
        {/* {renderGrid()} */}
      </div>
    </div>
  )
}
