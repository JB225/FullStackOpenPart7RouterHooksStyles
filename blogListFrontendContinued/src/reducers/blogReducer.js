import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.createNewBlog(blog)
    dispatch
  }
}

export default blogSlice.reducer