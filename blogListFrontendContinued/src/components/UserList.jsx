import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import { useEffect } from 'react'
import { initialiseUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(initialiseUsers())
  }, [dispatch])

  return (
    <div>
      <Header />
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{ user.name }</Link></td>
              <td>{ user.blogs.length }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList