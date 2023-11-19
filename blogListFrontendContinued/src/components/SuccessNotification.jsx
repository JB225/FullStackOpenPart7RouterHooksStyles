import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  style.color = true ? 'green' : 'red'

  if (message === null) {
    return null
  }

  return (
    <div className="success" style={style}>
      {message}
    </div>
  )
}

export default Notification
