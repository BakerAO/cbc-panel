// import api from '../data/api'

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
}

export default function CreatePerson() {
  return (
    <div style={styles.container}>
      <button style={styles.button}>
        <div style={styles.inside}>
          +
        </div>
      </button>
    </div>
  )
}
