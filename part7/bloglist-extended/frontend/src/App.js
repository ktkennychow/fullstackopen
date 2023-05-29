import { useState, useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import { getAll, update, create, remove, comment, setToken, getAllComments } from './services/blogs'
import { login } from './services/login'
import ToggleVisibility from './components/ToggleVisibility'
import LoginForm from './components/LoginForm'
import UsersDisplay from './components/UsersDisplay'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import Notification from './Notification'
import NotificationContext from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

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

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return null
  }
}

const App = () => {
  const blogFormRef = useRef()
  let timeoutIdRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, userDispatch] = useReducer(userReducer, null)
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    style: '',
    content: '',
  })
  const queryClient = useQueryClient()
  const newCommentMutation = useMutation(comment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })
  const newBlogMutation = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      queryClient.invalidateQueries('users')
    },
  })
  const updateBlogMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })
  const removeBlogMutation = useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const blogsQuery = useQuery({
    queryKey: 'blogs',
    queryFn: getAll,
    enabled: !!user,
  })
  const blogs = blogsQuery.data

  const commentsQuery = useQuery({
    queryKey: 'comments',
    queryFn: getAllComments,
    enabled: !!user,
  })
  const comments = commentsQuery.data

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGIN', payload: user })
      setToken(user.token)
    }
  }, [])

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
      const user = await login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
      notificationDispatch({
        type: 'SUCCESS',
        payload: `login successfully! welcome ${user.name}.`,
      })
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
      setToken(null)
      userDispatch({ type: 'LOGOUT' })
      notificationDispatch({
        type: 'SUCCESS',
        payload: 'logout successfully! see you next time.',
      })
      handleResetNotification()
    } catch (err) {
      console.log(err, 'err in handleLogout')
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
      handleResetNotification()
    }
  }

  const handleNewComment = async (payload) => {
    console.log(payload)
    try {
      newCommentMutation.mutate(payload)
      notificationDispatch({
        type: 'SUCCESS',
        payload: 'a new comment added.',
      })
      handleResetNotification()
    } catch (err) {
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
      handleResetNotification()
    }
  }

  const handleNewBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      newBlogMutation.mutate(blog)
      notificationDispatch({
        type: 'SUCCESS',
        payload: `a new blog ${blog.title} by ${blog.author} added.`,
      })
      handleResetNotification()
    } catch (err) {
      notificationDispatch({ type: 'ERROR', payload: err.response.data.error })
      handleResetNotification()
    }
  }

  const handleLikes = async (blog) => {
    blog.likes = blog.likes + 1
    try {
      updateBlogMutation.mutate(blog)
      notificationDispatch({
        type: 'SUCCESS',
        payload: `you liked ${blog.title} by ${blog.author} !`,
      })
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
        removeBlogMutation.mutate(blog)
        notificationDispatch({
          type: 'SUCCESS',
          payload: `successfully deleted ${blog.title} by ${blog.author}!`,
        })
        handleResetNotification()
      } catch (err) {
        notificationDispatch({
          type: 'ERROR',
          payload: err.response.data.error,
        })
        handleResetNotification()
      }
    }
  }


  const BlogsDisplay = () => {
    return (
      <>
        {user &&
          <div>
            <div>
              <h2>blog app</h2>
              <ToggleVisibility
                buttonLabel='new blog'
                ref={blogFormRef}>
                <BlogForm handleNewBlog={handleNewBlog} />
              </ToggleVisibility>
            </div>
            {blogsQuery.isLoading ? (
              <div>Loading blogs...</div>
            ) : (
              blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    id={user.id}
                    username={user.username}
                    handleLikes={handleLikes}
                    handleDeleteBlog={handleDeleteBlog}
                  />
                ))
            )}
          </div>
        }
      </>
    )
  }


  const navbarStyle = {
    display: 'flex',
    gap: '5px',
    backgroundColor: '#ccc',
    padding: '5px',
  }

  return (
    <Router>
      {!user
        ? <div>
          <h2>log in to application</h2>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
        : <>
          <div style={navbarStyle}>
            <Link to='/'>blogs</Link>
            <Link to='/users'>users</Link>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
        </>
      }

      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
        id='main'>
        <Notification
          type={notification.style}
          content={notification.content}
        />
      </NotificationContext.Provider>

      <Routes>
        <Route path='/' element={<BlogsDisplay />} />
        <Route path='/blogs/:id' element={<BlogDetails blogs={blogs} user={user} comments={comments} handleLikes={handleLikes} handleDeleteBlog={handleDeleteBlog} handleNewComment={handleNewComment} />} />
        <Route path='/users' element={<UsersDisplay user={user} />} />
        <Route path='/users/:id' element={<UserDetails user={user} blogs={blogs} />} />
      </Routes>
    </Router>
  )
}

export default App
