const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// blogsRouter.get('/', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  console.log('get blog', blogs)
  response.json(blogs)
})

// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

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
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter