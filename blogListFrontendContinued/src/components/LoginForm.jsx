import { useDispatch } from 'react-redux'
import { logUserIn, setUser } from '../reducers/currentUserReducer'
import { useState } from 'react'
import { useEffect } from 'react'

import blogService from '../services/blogs'
import SuccessNotification from './Notification'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(logUserIn(username, password))

    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <SuccessNotification />
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="Submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
