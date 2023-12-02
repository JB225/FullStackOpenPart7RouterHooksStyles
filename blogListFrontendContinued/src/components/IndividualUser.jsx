import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from './Header'
import { useEffect } from 'react'
import { initialiseUsers } from '../reducers/usersReducer'

const IndividualUser = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  useEffect(() => {
    if (users.length === 0) {
      dispatch(initialiseUsers())
    }
  }, [dispatch, users])

  const local_id = useParams().id
  const user = users.find(u => u.id === local_id)

  if(!user) {
    return null
  }

  return (
    <div>
      <Header />
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>))}
      </ul>
    </div>
  )
}

export default IndividualUser