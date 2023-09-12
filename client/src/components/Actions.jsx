import { useState } from 'react'
import ActionsModal from './ActionsModal'

const styles = {
  container: {
    height: '200px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    height: '100px',
    width: '100px',
    borderRadius: '4rem',
    backgroundColor: 'green',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 50px 0 0',
  },
  inside: {
    height: '50px',
    width: '50px',
    fontSize: 70,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  minus: {
    height: '10px',
    width: '30px',
    backgroundColor: 'white',
  },
}

export default function Actions(props) {
  const { people } = props
  const [action, setAction] = useState(null)

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={() => setAction('create')}>
        <div style={styles.inside}>
          +
        </div>
      </button>
      <button style={{ ...styles.button, backgroundColor: 'red' }} onClick={() => setAction('delete')}>
        <div style={styles.minus} />
      </button>
      <ActionsModal action={action} setAction={setAction} people={people} />
    </div>
  )
}
