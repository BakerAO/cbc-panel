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
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: '50px',
    width: '200px',
    borderRadius: '.25rem',
    backgroundColor: 'delete',
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
  item: {
    height: '50px',
    width: '100px',
    fontSize: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    margin: '0 5px 0 0'
  },
  items: {
    height: '200px',
    width: '100%',
    // fontSize: 20,
    // color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}

export default function DeleteForm(props) {
  const { setAction, people } = props

  const handleClick = (p) => {
    api.post('delete', {
      name: p.name,
    })
    setAction(null)
  }

  const renderNames = () => {
    const items = []
    for (const p of people) {
      items.push(
        <button style={styles.item} onClick={() => handleClick(p)} key={p.name}>
          {p.name}
        </button>
      )
    }

    return items
  }

  return (
    <div style={styles.bottom}>
      <div style={styles.container}>
        <label>Select to Delete</label>
        <div style={styles.items}>
          {renderNames()}
        </div>
      </div>
    </div>
  )
}
