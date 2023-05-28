import { useState, useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService, { getAll, update, create, remove } from './services/blogs'
import loginService from './services/login'
import ToggleVisibility from './components/ToggleVisibility'
import LoginForm from './components/LoginForm'
import Notification from './Notification'
import NotificationContext from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const notificationReducer = (state, action) => {
  console.log(action, state)
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
  let timeoutIdRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, notificationDispatch] = useReducer(notificationReducer, { style: '', content: '' })
  const newBlogMutation = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  const updateBlogMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  const removeBlogMutation = useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const result = useQuery({
    queryKey: 'blogs',
    queryFn: getAll,
    enabled: !!user
  })

  const blogs = result.data

  const handleResetNotification = () => {
    // loveeeeee this setup to clear the timer for the notification display from the pervious trigger
    timeoutIdRef.current && clearTimeout(timeoutIdRef.current)
    timeoutIdRef.current = setTimeout(() => {
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
  // blog done
  const handleNewBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      newBlogMutation.mutate(blog)
      notificationDispatch({ type: 'SUCCESS', payload: `a new blog ${blog.title} by ${blog.author} added.` })
      handleResetNotification()
    } catch (err) {
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
      handleResetNotification()
    }
  }

  // like done
  const handleLikes = async (blog) => {
    blog.likes = blog.likes + 1
    try {
      updateBlogMutation.mutate(blog)
      notificationDispatch({ type: 'SUCCESS', payload: `you liked ${blog.title} by ${blog.author} !` })
      handleResetNotification()
    } catch (err) {
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
      handleResetNotification()
    }
  }
  // delete done
  const handleDeleteBlog = async (blog) => {
    console.log(blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        removeBlogMutation.mutate(blog)
        notificationDispatch({ type: 'SUCCESS', payload: `successfully deleted ${blog.title} by ${blog.author}!` })
        handleResetNotification()
      } catch (err) {
        notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
        handleResetNotification()
      }
    }
  }


  const blogsDisplay = () => {
    return (
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
        {result.isLoading
          ? <div>Loading data...</div>
          :
          blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              id={user.id}
              username={user.username}
              handleLikes={handleLikes}
              handleDeleteBlog={handleDeleteBlog}
            />
          ))
        }
      </div>
    )
  }

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
