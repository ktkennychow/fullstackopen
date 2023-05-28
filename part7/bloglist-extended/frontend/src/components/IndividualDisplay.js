import { useParams } from 'react-router-dom'

const individualDisplay = () => {
  const userId = useParams().id
  const targetBlogs = blogs.filter(blog => blog.user.id === blogs[0].user.id)
  return (
    <>
      {user &&
        <div>
          <h2>{targetBlogs[0].user.name}</h2>
          <h3>added blogs</h3>
          {usersQuery.isLoading || blogsQuery.isLoading
            ? <div>Loading blogs...</div>
            : <ul>
              {targetBlogs.map(blog => <li key={blog.title}>{blog.title}</li>)}
            </ul>
          }
        </div>
      }
    </>
  )
}