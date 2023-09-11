import React from 'react'
import Button from './common/Button'

const styles = {
  doctorRows: {
    display: 'flex',
    flexDirection: 'row'
  }
}

export default function ActiveDoctors(props) {
  const { doctors, handleClick, weekday } = props

  const renderDoctors = () => {
    return doctors.map(doctor => {
      const color = doctor[weekday] ? '#28a745' : 'red';
      return (
        <div className="col" key={doctor.id}>
          <div className="middle center"
            style={{
              margin: '10px',
              width: '80%',
              height: '50px'
            }}
          >
            <Button
              color={color}
              label={doctor.name}
              handleClick={() => handleClick(doctor)}
            />
          </div>
        </div>
      )
    })
  }

  return (
    <div className="grid flex h-5">
      <div style={styles.doctorRows}>
        {renderDoctors()}
      </div>
    </div>
  )
}
