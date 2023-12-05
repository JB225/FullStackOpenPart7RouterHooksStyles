import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/currentUserReducer'
import { Link } from 'react-router-dom'

const Header = () => {
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  const padding = {
    padding: 5
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(192, 192, 192)'
  }

  return (
    <div style={blogStyle}>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {<em>{user.name} is logged in <button onClick={handleLogout}>logout</button> </em>}
    </div>
  )
}

export default Header