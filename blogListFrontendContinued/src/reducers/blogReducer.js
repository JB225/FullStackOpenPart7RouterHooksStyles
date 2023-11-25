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
    updateLikes(state, action) {
      return state.map(blog => blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const { appendBlog, setBlogs, updateLikes, removeBlog } = blogSlice.actions

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
    dispatch(updateLikes(blog))
    await blogService.updateBlog( blog.id, { ...blog, likes: blog.likes + 1 } )
  }
}

export const deleteBlog = blogId => {
  return async dispatch => {
    blogService.deleteBlog(blogId)
    dispatch(removeBlog(blogId))
  }
}

export default blogSlice.reducer