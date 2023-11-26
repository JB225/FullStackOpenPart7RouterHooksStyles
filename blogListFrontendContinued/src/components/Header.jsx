import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/currentUserReducer'

const Header = () => {
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  return (
    <div>
      <h2>blogs</h2>
      <p> {user === null ? '' : user.name} {console.log(user)} is logged in <button onClick={handleLogout}>logout</button> </p>
    </div>
  )
}

export default Header