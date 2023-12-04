import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'

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

  return (
    <div>
      <Header />
      <Notification />
      <h2>Blogs</h2>
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
        .sort((a, b) => b.props.blog.likes - a.props.blog.likes)}
    </div>
  )
}

export default BlogList