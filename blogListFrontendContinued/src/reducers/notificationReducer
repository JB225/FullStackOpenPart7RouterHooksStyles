import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    success: null
  },
  reducers: {
    setMessage(state, action) {
      return action.payload
    }
  }
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (message) => {
  return (dispatch) => {
    setTimeout(() => {dispatch(setMessage({ message: null, success: null }))}, 2000)
    dispatch(setMessage(message))
  }
}

export default notificationSlice.reducer