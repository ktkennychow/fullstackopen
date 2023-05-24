import { useContext, useRef} from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  let timeoutIdRef = useRef(null)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  timeoutIdRef.current && clearTimeout(timeoutIdRef.current)

  timeoutIdRef.current = setTimeout(() => {
    dispatch({ type: 'RESET' })
  }, 5000)
  
  
  
  return (
    <div>
      {notification && <div style={style}>{notification}</div >}
    </div>
  )
}




export default Notification
