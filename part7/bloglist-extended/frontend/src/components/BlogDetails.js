import { useParams } from 'react-router-dom'

const BlogDetails = ({ user, blogs, handleLikes, handleDeleteBlog }) => {
  const addBlog = (blog) => {
    handleLikes(blog)
  }
  if (!user) {
    return null
  }
  const BlogId = useParams().id
  const targetBlog = blogs.find(blog => blog.id === BlogId)
  return (
    <>
      <h1>
        {`${targetBlog.title} by ${targetBlog.author} `}
      </h1>
      <a href={targetBlog.url} style={{ textDecoration: 'none' }}>{targetBlog.url}</a>
      <div>likes {targetBlog.likes}{' '}
        <button onClick={() => { addBlog(targetBlog) }}>like</button>
      </div>
      <div>{`added by ${targetBlog.user.name}`}</div>
      {targetBlog.user === user.id || targetBlog.user.id === user.id
        ? <button onClick={() => { handleDeleteBlog(targetBlog) }}>remove</button>
        : null}
    </>
  )
}

export default BlogDetails