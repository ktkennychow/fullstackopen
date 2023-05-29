import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    margin: '5px 0px',
    padding: 10,
    border: '1px black solid',
  }
  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`} ><em>{blog.title}</em></Link>{` by ${blog.author} `}


    </div>
  )
}

export default Blog