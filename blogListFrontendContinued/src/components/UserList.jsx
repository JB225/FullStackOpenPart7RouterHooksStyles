import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Table from 'react-bootstrap/Table'
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
      <br></br>
      <h2 className="text-left">Users Table</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
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
      </Table>
    </div>
  )
}

export default UserList