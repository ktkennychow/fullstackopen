import {
  createContext,
  // useContext
} from 'react'

const UserContext = createContext()

// export const useNoticationState = () => {
//   const userAndDispatch = useContext(UserContext)
//   return userAndDispatch[0]
// }

// export const useNoticationDispatch = () => {
//   const userAndDispatch = useContext(UserContext)
//   return userAndDispatch[1]
// }


export default UserContext