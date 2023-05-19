import { useState } from 'react'

const Blog = ({ blog, name, handleLikes }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    padding: 10,
    border: '1px black solid',
  }

  return (
    <div style={blogStyle}>
      <div><em>{blog.title}</em>{` by ${blog.author} `}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <a href={blog.url} style={{ textDecoration: 'none' }}>{blog.url}</a>
          <div>likes {blog.likes} <button onClick={()=>{handleLikes(blog)}}>like</button></div>
          <div>{name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog