import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Welcome to the "Programmer Anecdote" project'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      const content = action.payload
      return content
    },
    notificationRemove(state, action) {
      return null
    }
  }

})

export const { notificationChange, notificationRemove } = notificationSlice.actions

export const setNotification = (notification, duration) => {
  return dispatch => {
    dispatch(notificationChange(notification))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer