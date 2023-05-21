import { useState } from 'react'

const Blog = ({ blog, name, id, handleLikes, handleDeleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    margin: '5px 0px',
    padding: 10,
    border: '1px black solid',
  }

  return (
    <div style={blogStyle} className='blog'>
      <div><em>{blog.title}</em>{` by ${blog.author} `}
        <button onClick={() => setShowDetails(!showDetails)} id='viewButton'>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <a href={blog.url} style={{ textDecoration: 'none' }}>{blog.url}</a>
          <div>likes {blog.likes} <button onClick={() => { handleLikes(blog) }} id='likeButton'>like</button></div>
          <div>{name}</div>
          {blog.user === id || blog.user.id === id
            ? <button onClick={() => { handleDeleteBlog(blog) }}>remove</button>
            : null}
        </div>
      )}
    </div>
  )
}

export default Blog