import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import ToggleVisibility from './ToggleVisibility'
import BlogForm from './BlogForm'

const BlogsDisplay = ({ user, blogFormRef, handleNewBlog, blogs }) => {
  if (!user || !blogs) {
    return null
  }
  console.log(11111,blogs[0])
  return (
    <>
      <div>
        <div>
          <h2>blog app</h2>
          <ToggleVisibility
            buttonLabel='new blog'
            ref={blogFormRef}>
            <BlogForm handleNewBlog={handleNewBlog} />
          </ToggleVisibility>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`} ><em>{blog.title}</em></Link>
                    </TableCell>
                    <TableCell>
                      {blog.author}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </>
  )
}
export default BlogsDisplay