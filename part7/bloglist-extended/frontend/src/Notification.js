import { useNoticationState } from './NotificationContext'


const success = {
  color: 'green',
  border: 'green 3px solid',
  padding: '10px',
  backgroundColor: '#ccc',
  borderRadius: '5px',
  margin: '5px 0'
}
const error = {
  color: 'red',
  border: 'red 3px solid',
  padding: '10px',
  backgroundColor: '#ccc',
  borderRadius: '5px',
  margin: '5px 0'
}

const Notification = () => {
  const notification = useNoticationState()

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