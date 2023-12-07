import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'

import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Notification from './Notification'
import Header from './Header'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogList = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.currentUser)

  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  return (
    <div>
      <Header />
      <Notification />
      <br></br>
      <h2>Blogs</h2>
      <br></br>
      <NewBlogForm />
      <br></br>
      <ListGroup>
        {blogs
          .map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
              />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}

export default BlogList