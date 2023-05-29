import { useNoticationState } from './NotificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useNoticationState()
  if (!notification.type) {
    return null
  }
  const status = notification.type.toLowerCase()
  return (
    <Alert style={{ position: 'absolute', top: '0', right: '10px' }} sx={{ mt: 1 }} severity={status}>
      {notification.payload}
    </Alert>
  )
}

export default Notification