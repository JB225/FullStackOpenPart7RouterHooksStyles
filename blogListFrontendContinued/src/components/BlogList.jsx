import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'
import { setUser } from '../reducers/currentUserReducer'

import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Notification from './Notification'
import Header from './Header'

const BlogList = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.currentUser)

  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p> {user.name} is logged in <button onClick={handleLogout}>logout</button> </p>
      <NewBlogForm />
      <br></br>
      {blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            username={user.username}
          />
        ))
        .sort((a, b) => a.props.blog.likes - b.props.blog.likes)}
    </div>
  )
}

export default BlogList