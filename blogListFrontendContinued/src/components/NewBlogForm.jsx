import { useRef, useState } from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
        <Form onSubmit={handleCreateNewBlog}>
          <div>
          Title:{' '}
            <Form.Control
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div>
          Author:{' '}
            <Form.Control
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div>
          Url:{' '}
            <Form.Control
              id="url"
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setURL(target.value)}
            />
          </div>
          <br></br>
          <Button id="create-button" type="Submit">
          create
          </Button>
        </Form>
      </Togglable>

    </div>
  )
}

export default NewBlogForm
