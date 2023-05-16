const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  blogsInDb,
  usersInDb,
}