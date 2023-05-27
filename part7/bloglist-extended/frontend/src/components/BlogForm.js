import { useState } from 'react'
import PropTypes from 'prop-types'

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
        title:
        <input
          type='text'
          value={newBlog.title}
          name='title'
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          placeholder='title of the blog'
          id='title-input'
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={newBlog.author}
          name='author'
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          placeholder='name of the author'
          id='author-input'
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={newBlog.url}
          name='url'
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          placeholder='url of the blog'
          id='url-input'
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}
export default BlogForm