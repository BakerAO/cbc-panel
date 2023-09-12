import { useEffect, useState } from 'react'
import api from '../data/api'
import socket from '../data/socket'
import Grid from './Grid'
import Actions from './Actions'

export default function App() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    const getPeople = async () => {
      const peopleRes = await api.get('/people')
      setPeople(peopleRes.data)
    }

    getPeople()
    socket.on('update', (ioPeople) => {
      setPeople(ioPeople)
    })
  }, [])

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Grid people={people} />
      <Actions people={people} />
    </div>
  )
}
