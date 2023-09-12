import api from '../data/api'

const styles = {
  grid: {
    boxSizing: 'border-box',
    height: '80%',
    width: '98%',
    border: '2px solid black',
  },
  insideGrid: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    height: '40px',
    width: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    margin: '5px',
    fontSize: 30,
  }
}

export default function Grid(props) {
  const { people } = props

  const handleClick = (p) => {
    api.post('/people', {
      name: p.name,
      saved: p.saved,
      inBuilding: !p.inBuilding,
    })
  }

  const renderPeople = () => {
    const items = []
    for (const p of people) {
      let style = styles.item
      if (p.inBuilding) style = {
        ...style,
        backgroundColor: 'green',
        color: 'white'
      }

      items.push(
        <div style={style} key={p.id} onClick={() => handleClick(p)}>
          {p.name}
        </div>
      )
    }

    return items
  }


  return (
    <div style={styles.grid}>
      <div style={styles.insideGrid}>
        {renderPeople()}
      </div>
    </div>
  )
}
