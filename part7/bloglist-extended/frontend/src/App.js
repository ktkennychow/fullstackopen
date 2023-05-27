import { useState, useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import ToggleVisibility from './components/ToggleVisibility'
import LoginForm from './components/LoginForm'
import Notification from './Notification'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
    case 'ERROR':
      return action
    case 'RESET':
      return { style: '', content: '' }
    default:
      return state
  }
}

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, notificationDispatch] = useReducer(notificationReducer, { style: '', content: '' })

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

  const handleResetNotification = () => {
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' })
    }, 5000)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notificationDispatch({ type: 'SUCCESS', payload: `login successfully! welcome ${user.name}.` })
      handleResetNotification()
      setUsername('')
      setPassword('')
    } catch (err) {
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
      handleResetNotification()
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      blogService.setToken(null)
      setUser(null)
      notificationDispatch({ type: 'SUCCESS', payload: 'logout successfully! see you next time.' })
      handleResetNotification()
    } catch (err) {
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
      handleResetNotification()
    }
  }

  const handleNewBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blog)
      const sortedBlogs = sortByLikes(blogs.concat(newBlog))
      setBlogs(sortedBlogs)
      notificationDispatch({ type: 'SUCCESS', payload: `a new blog ${blog.title} by ${blog.author} added.` })
      handleResetNotification()
    } catch (err) {
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
      handleResetNotification()
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
      notificationDispatch({ type: 'SUCCESS', payload: `you liked ${blog.title} by ${blog.author} !` })
      handleResetNotification()
    } catch (err) {
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
      handleResetNotification()
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
        notificationDispatch({ type: 'SUCCESS', payload: `successfully deleted ${blog.title} by ${blog.author}!` })
        handleResetNotification()
      } catch (err) {
        notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
        handleResetNotification()
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
    <NotificationContext.Provider value={[notification, notificationDispatch]} id='main'>
      {user ? <h2>blogs</h2> : <h2>log in to application</h2>}
      <Notification type={notification.style} content={notification.content} />
      {!user
        ? <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        : blogsDisplay()}
    </NotificationContext.Provider>
  )
}


export default App
