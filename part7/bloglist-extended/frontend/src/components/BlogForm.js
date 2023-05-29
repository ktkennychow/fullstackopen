import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Button
} from '@mui/material'

const BlogForm = ({ handleNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
    return null
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        <TextField
          sx={{ mt: 1 }}
          label='title'
          type='text'
          value={newBlog.title}
          name='title'
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          placeholder='title of the blog'
          id='title-input'
        />
      </div>
      <div>
        <TextField
          sx={{ mt: 1 }}
          label='author'
          type='text'
          value={newBlog.author}
          name='author'
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          placeholder='name of the author'
          id='author-input'
        />
      </div>
      <div>
        <TextField
          sx={{ mt: 1 }}
          label='url'
          type='url'
          value={newBlog.url}
          name='url'
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          placeholder='url of the blog'
          id='url-input'
        />
      </div>
      <Button type='submit' sx={{ mt: 1 }} variant="contained" color="primary">create</Button>
    </form>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}
export default BlogForm