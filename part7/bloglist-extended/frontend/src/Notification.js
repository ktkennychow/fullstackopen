import { useNoticationState } from './NotificationContext'


const success = {
  color: 'green',
  border: 'green 3px solid',
  padding: '10px',
  backgroundColor: '#ccc',
  borderRadius: '5px',
}
const error = {
  color: 'red',
  border: 'red 3px solid',
  padding: '10px',
  backgroundColor: '#ccc',
  borderRadius: '5px',
}

const Notification = () => {
  const notification = useNoticationState()

  console.log(notification)
  let style
  notification.type === 'SUCCESS'
    ? style = success
    : notification.type === 'ERROR'
      ? style = error
      : ''
  return (
    <div
      style={style}
      id='notification'>
      {notification.payload}
    </div>
  )
}

export default Notification