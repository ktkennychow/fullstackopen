import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import ToggleVisibility from './components/ToggleVisibility'
import LoginForm from './components/LoginForm'

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [status, setStatus] = useState({})
  const good = {
    color: 'green',
    border: 'green 3px solid',
    padding: '10px',
    backgroundColor: '#ccc',
    borderRadius: '5px',
  }
  const bad = {
    color: 'red',
    border: 'red 3px solid',
    padding: '10px',
    backgroundColor: '#ccc',
    borderRadius: '5px',
  }

  const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  useEffect(() => {
    user &&
      blogService
        .getAll()
        .then((blogs) => setBlogs(sortByLikes(blogs)))
        .then(() => { })
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (notification, newStatus) => {
    setNotification(notification)
    setStatus(newStatus)
    setTimeout(() => {
      setNotification('')
      setStatus({})
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      handleNotification(`login successfully! welcome ${user.name}.`, good)
      setUsername('')
      setPassword('')
    } catch (err) {
      handleNotification(err.response.data.error, bad)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      blogService.setToken(null)
      setUser(null)
      handleNotification('logout successfully! see you next time.', good)
    } catch (err) {
      handleNotification(err.response.data.error, bad)
    }
  }

  const handleNewBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blog)
      const sortedBlogs = sortByLikes(blogs.concat(newBlog))
      setBlogs(sortedBlogs)
      handleNotification(
        `a new blog ${blog.title} by ${blog.author} added.`,
        good
      )
    } catch (err) {
      handleNotification(err.response.data.error, bad)
    }
  }

  const handleLikes = async (blog) => {
    blog.likes = blog.likes + 1
    try {
      const updatedBlog = await blogService.update(blog)
      const targetBlog = blogs.filter((blog) => blog.id === updatedBlog.id)
      targetBlog.likes = updatedBlog.likes
      const sortedBlogs = sortByLikes(blogs)
      setBlogs(sortedBlogs)
      handleNotification(`you liked ${blog.title} by ${blog.author} !`, good)
    } catch (err) {
      console.log(err)
      handleNotification(err.response.data.error, bad)
    }
  }

  const handleDeleteBlog = async (blog) => {
    console.log(blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog)
        console.log('passed!')
        const targetBlog = blog
        const updatedBlogs = blogs.filter((blog) => blog.id !== targetBlog.id)
        const sortedBlogs = sortByLikes(updatedBlogs)
        setBlogs(sortedBlogs)
        handleNotification(
          `successfully deleted ${blog.title} by ${blog.author}!`,
          good
        )
      } catch (err) {
        console.log(err)
        handleNotification(err.response.data.error, bad)
      }
    }
  }

  const blogsDisplay = () => (
    <div>
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <ToggleVisibility
          buttonLabel='new blog'
          ref={blogFormRef}>
          <BlogForm handleNewBlog={handleNewBlog} />
        </ToggleVisibility>
      </div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          id={user.id}
          username={user.username}
          handleLikes={handleLikes}
          handleDeleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  )

  return (
    <div>
      {user ? <h2>blogs</h2> : <h2>log in to application</h2>}
      <h3 style={status}>{notification}</h3>
      {!user
        ? <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        : blogsDisplay()}
    </div>
  )
}

export default App
