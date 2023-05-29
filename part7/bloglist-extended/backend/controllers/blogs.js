const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

const verification = (request) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
}

blogsRouter.post('/:id/comments', async (request, response) => {
  verification(request)
  const blogToComment = await Blog.findById(request.params.id)
  console.log(blogToComment)
  const comment = new Comment({ comment: request.body.comment })
  const savedComment = await comment.save()
  blogToComment.comments = blogToComment.comments.concat(savedComment._id)
  await blogToComment.save()
  response.status(201).json(savedComment)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  verification(request)
  const comments = await Comment
    .find({})
  response.json(comments)
})

blogsRouter.get('/', async (request, response) => {
  verification(request)
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  verification(request)
  const body = request.body
  const user = request.user

  if (!(body.url && body.title)) {
    response.status(400).json(body)
  }

  if (body.url && body.title) {
    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes,
      user: user.id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  verification(request)
  const body = request.body
  const user = request.user

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
    comments: body.comments
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(202).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  verification(request)
  const user = request.user

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