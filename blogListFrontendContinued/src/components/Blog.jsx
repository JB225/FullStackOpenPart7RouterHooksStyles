import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</ Link>
      </div>
    </div>
  )
}

export default Blog
