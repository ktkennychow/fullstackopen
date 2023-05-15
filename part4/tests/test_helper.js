const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "I love Jeff Basil",
    author: "Maya",
    url: "www.amazon.com/blog/amazedballs",
    likes: 6000009
  },
  {
    title: "WTH is GOOGLE",
    author: "ken",
    url: "www.google.com",
    likes: 432
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  // nonExistingId,
  blogsInDb
}
