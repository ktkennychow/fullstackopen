import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Welcome to the "Programmer Anecdote" project'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      state = action.content
    }
  }

})

export const {notificationChange} = notificationSlice.actions
export default notificationSlice.reducer