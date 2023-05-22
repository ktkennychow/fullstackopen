const Notification = ({ status, notification }) => {
  return (
    <div style={status} id='err-msg'>{notification}</div>
  )
}

export default Notification