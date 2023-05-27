import { createContext, useContext } from 'react'

const NotificationContext = createContext()

export const useNoticationState = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNoticationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}


export default NotificationContext