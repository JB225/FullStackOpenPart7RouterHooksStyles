import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import SuccessNotification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initialiseBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs))
  // }, [])

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification(
        { message: 'wrong username or password',
          success: false }))
    }

    setPassword('')
    setUsername('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleCreateNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlogReturn = await blogService.createNewBlog(newBlog)
      dispatch(createBlog(newBlogReturn))
      // blogs = blogs.concat(newBlogReturn)
      // setBlogs(blogs.concat(newBlogReturn))

      dispatch(setNotification(
        { message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          success: true }))
    } catch (exception) {
      dispatch(setNotification(
        { message: 'New blog could not be created',
          success: false }))
    }
  }

  const handleUpdatedBlog = async (blogId, updatedBlog) => {
    const updatedBlogResponse = await blogService.updateBlog(
      blogId,
      updatedBlog,
    )
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlogResponse.id ? updatedBlogResponse : blog,
    )
    // setBlogs(updatedBlogs)
  }

  const handleDeletedBlog = async (deletedBlogId) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlogId)
    // setBlogs(updatedBlogs)
  }

  if (user === null) {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification />
      <p>
        {user.name} is logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <NewBlogForm createNewBlog={handleCreateNewBlog} />
      </Togglable>

      <br></br>
      {blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            username={user.username}
            handleUpdatedBlog={handleUpdatedBlog}
            handleDeletedBlog={handleDeletedBlog}
          />
        ))
        .sort((a, b) => a.props.blog.likes - b.props.blog.likes)}
    </div>
  )
}

export default App