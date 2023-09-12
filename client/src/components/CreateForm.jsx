import { useState } from 'react'
import api from '../data/api'

const styles = {
  bottom: {
    height: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: '50px',
    width: '200px',
    borderRadius: '.25rem',
    backgroundColor: 'green',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 0 0 0',
  },
  inside: {
    height: '50px',
    width: '50px',
    fontSize: 40,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default function CreateForm(props) {
  const { setAction } = props
  const [values, setValues] = useState({ name: '', saved: false })

  const handleClose = () => {
    setValues({ name: '', saved: false })
    setAction(null)
  }

  const handleSubmit = () => {
    const { name, saved } = values
    api.post('create', {
      name,
      saved,
    })
    handleClose()
  }

  return (
    <div style={styles.bottom}>
      <div style={styles.checkbox}>
        <label style={{ marginRight: 5 }}>Name</label>
        <input
          type='text'
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
      </div>
      <div style={styles.checkbox}>
        <label>Save</label>
        <input
          type='checkbox'
          name='saved'
          value={values.saved}
          onChange={(e) => setValues({ ...values, saved: e.target.checked })}
        />
      </div>
      <button style={styles.button} onClick={handleSubmit}>
        <div style={styles.inside}>
          Submit
        </div>
      </button>
    </div>
  )
}
