import { useEffect, useState } from 'react'
import { increaseLikes, initialiseBlogs } from '../reducers/blogReducer'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const IndividualBlog = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const [comments, setComments] = useState('')

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initialiseBlogs())
    }
  }, [dispatch, blogs])

  const local_id = useParams().id
  const blog = blogs.find(b => b.id === local_id)

  const handleLikeBlog = async () => {
    dispatch(increaseLikes(blog))
  }

  if(!blog) {
    return null
  }

  const handleComments = () => {
    console.log(comments)
    setComments('')
  }

  return (
    <div>
      <Header />
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <button onClick={handleLikeBlog}>like</button></div>
      <div>added by {blog.author}</div>
      <h3>comments</h3>
      <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
      <button onClick={handleComments}>add comment</button>
      <ul>
        {blog.comments.map(c => (<li key={c}>{c}</li>) )}
      </ul>
    </div>
  )
}

export default IndividualBlog