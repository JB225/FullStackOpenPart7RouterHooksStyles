import { useDispatch } from 'react-redux'
import { logUserIn, setUser } from '../reducers/currentUserReducer'
import { useState } from 'react'
import { useEffect } from 'react'

import blogService from '../services/blogs'
import SuccessNotification from './Notification'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

    navigate('/blogs')
  }

  const divStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }

  return (
    <div style={divStyle}>
      <br></br>
      <h2>Log In To Application</h2>
      <br></br>
      <SuccessNotification />
      <Form onSubmit={handleLogin}>
        <div>
          Username{' '}
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{' '}
          <Form.Control
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br></br>
        <Button id="login-button" type="Submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
