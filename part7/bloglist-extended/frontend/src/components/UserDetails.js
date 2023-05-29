import { useParams } from 'react-router-dom'

const UserDetails = ({ user, blogs }) => {
  if (!user) {
    return null
  }
  const userId = useParams().id
  const targetBlogs = blogs.filter(blog => blog.user.id === userId)
  return (
    <>
      {targetBlogs.length
        ? <div>
          <h2>{targetBlogs[0].user.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {targetBlogs.map(blog => <li key={blog.title}>{blog.title}</li>)}
          </ul>
        </div>
        : <div>
          <h2>{targetBlogs[0].user.name}</h2>
          <h3>added blogs</h3>
        </div>
      }
    </>
  )
}

export default UserDetails