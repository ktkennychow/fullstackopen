require('dotenv').config()

const mongoose = require('mongoose')
const MONGODB_URI = process.env.TEST_MONGODB_URI


mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: '4324fdsfdsfds',
  author: 'fdafsafsa',
  url: 'www.fsdfsdfdsfsd.com',
  likes: 432432
})

blog.save().then(result => {
  console.log('blog saved!', result)
  console.log(blog)
  mongoose.connection.close()
})
