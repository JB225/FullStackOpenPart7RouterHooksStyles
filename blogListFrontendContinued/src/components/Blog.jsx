import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, increaseLikes } from '../reducers/blogReducer'

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()
  const [blogShown, setBlogShown] = useState(false)
  const ShowWhenBlogShown = { display: blogShown ? '' : 'none' }
  const showDeleteButton = {
    display: username === blog.user.username ? '' : 'none',
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleShowFullBlog = () => {
    setBlogShown(!blogShown)
  }

  const handleLikeBlog = async () => {
    dispatch(increaseLikes(blog))
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title}, {blog.author}{' '}
        <button onClick={toggleShowFullBlog}>
          {blogShown ? 'hide' : 'view'}
        </button>
      </div>
      <div style={ShowWhenBlogShown} className="shownOnlyWhenShowTrue">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleLikeBlog}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <button
            className="delete"
            onClick={handleDeleteBlog}
            style={showDeleteButton}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
