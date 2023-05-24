import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
      return `anecdote "${action.content}" is created`
    case 'VOTE':
      return `anecdote "${action.content}" is voted`
    case 'ERROR':
      return 'too short anecdote, must have length 5 or more'
    case 'RESET':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext