import { useRef, useState } from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(setNotification(
        { message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          success: true }))
    } catch (exception) {
      dispatch(setNotification(
        { message: 'New blog could not be created',
          success: false }))
    }

    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div>
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <h2>create new</h2>
        <form onSubmit={handleCreateNewBlog}>
          <div>
          title:{' '}
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div>
          author:{' '}
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div>
          url:{' '}
            <input
              id="url"
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setURL(target.value)}
            />
          </div>
          <button id="create-button" type="Submit">
          create
          </button>
        </form>
      </Togglable>

    </div>
  )
}

export default NewBlogForm
