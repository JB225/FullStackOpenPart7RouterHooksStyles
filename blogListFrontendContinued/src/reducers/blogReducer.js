import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.createNewBlog(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const increaseLikes = blog => {
  return async dispatch => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments
    }
    const updatedBlogResponse = await blogService.updateBlog( blog.id, updatedBlog )
    dispatch(updateBlog(updatedBlogResponse))
  }
}

export const deleteBlog = blogId => {
  return async dispatch => {
    blogService.deleteBlog(blogId)
    dispatch(removeBlog(blogId))
  }
}

export default blogSlice.reducer