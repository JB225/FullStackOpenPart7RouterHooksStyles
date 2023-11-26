import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'curentUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const logUserIn = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification(
        { message: 'wrong username or password',
          success: false }))
    }
  }
}

export default userSlice.reducer