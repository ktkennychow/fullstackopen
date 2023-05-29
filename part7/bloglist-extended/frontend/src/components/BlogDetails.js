import { useState } from 'react'
import { useParams } from 'react-router-dom'


const BlogDetails = ({ user, blogs, comments, handleLikes, handleDeleteBlog, handleNewComment }) => {
  const [newComment, setNewComment] = useState('')
  if (!user) {
    return null
  }
  const likeBlog = (blog) => {
    handleLikes(blog)
  }
  const addComment = (e) => {
    e.preventDefault()
    const payload = { content: { comment: newComment }, blogId: blogId }
    console.log(payload)
    handleNewComment(payload)
    setNewComment('')
  }
  const blogId = useParams().id
  const targetBlog = blogs.find(blog => blog.id === blogId)

  const targetComments = comments.filter(comment => targetBlog.comments.includes(comment.id) )
  return (
    <>
      <h1>
        {`${targetBlog.title} by ${targetBlog.author} `}
      </h1>
      <a href={targetBlog.url} style={{ textDecoration: 'none' }}>{targetBlog.url}</a>
      <div>likes {targetBlog.likes}{' '}
        <button onClick={() => { likeBlog(targetBlog) }}>like</button>
      </div>
      <div>{`added by ${targetBlog.user.name}`}</div>
      {targetBlog.user === user.id || targetBlog.user.id === user.id
        ? <button onClick={() => { handleDeleteBlog(targetBlog) }}>remove</button>
        : null}

      <div>
        <h3>comments</h3>
        <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} /> <button onClick={addComment}>add comment</button>
        <ul>
          {targetComments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
        </ul>
      </div>
    </>
  )
}

export default BlogDetails