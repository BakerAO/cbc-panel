import CreateForm from './CreateForm'
import DeleteForm from './DeleteForm'

const styles = {
  dialog: {
    position: 'absolute',
    top: '50px',
    boxShadow: "0px 0px 500px #555555",
  },
  container: {
    height: '600px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  top: {
    height: '60px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  close: {
    fontSize: 40,
    color: 'white',
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default function ActionsModal(props) {
  const { action, setAction, people } = props

  return (
    <dialog open={!!action} style={styles.dialog}>
      <div style={styles.container}>
        <div style={styles.top}>
          <div style={styles.close} onClick={() => setAction(null)}>
            X
          </div>
        </div>
        {action === 'create' ? <CreateForm setAction={setAction} /> : null}
        {action === 'delete' ? <DeleteForm setAction={setAction} people={people} /> : null}
      </div>
    </dialog>
  )
}
