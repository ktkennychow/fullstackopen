const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  console.log('get blog', blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!(body.url && body.title)) {
    response.status(400).json(body)
  }


  if (body.url && body.title) {

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    console.log('post blog', savedBlog)
    console.log(user)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(body.id)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(202).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }
})


module.exports = blogsRouter