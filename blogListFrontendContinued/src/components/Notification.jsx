import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  style.color = useSelector(state => notification.success) ? 'green' : 'red'

  if (notification.message === null) {
    return null
  }

  return (
    <div className="success" style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
