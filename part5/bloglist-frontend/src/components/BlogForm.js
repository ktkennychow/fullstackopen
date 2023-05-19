import { useState } from 'react'

const BlogFrom = ({ handleNewBlog }) => {
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
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={newBlog.author}
          name='author'
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={newBlog.url}
          name='url'
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogFrom