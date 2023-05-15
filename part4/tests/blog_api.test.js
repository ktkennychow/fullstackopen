const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 10_00000)

test('blogs are returned as JSON', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10_00000)

test('unique identifier property of the blog posts is named id', async () => {
  const res = await api
    .get('/api/blogs')
  console.log(res.body[0].id)
  expect(res.body[0].id).toBeDefined()
})

test('making an HTTP POST request creates a new blog post', async () => {

  const newBlog = {
    title: "I love Jeff Basil",
    author: "Maya",
    url: "www.amazon.com/blog/amazedballs",
    likes: 6000009
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const BlogsAtEnd = await helper.blogsInDb()

  expect(BlogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

}, 10_00000)

test('likes property default to the value 0 when missing', async () => {

  const newBlog = {
    title: "I love Jeff Basil",
    author: "Maya",
    url: "www.amazon.com/blog/amazedballs",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const BlogsAtEnd = await helper.blogsInDb()
  const lastBlog = BlogsAtEnd.slice(-1)[0]

  expect(lastBlog.likes).toEqual(0)

}, 10_00000)

test('blog without url or title is not added', async () => {
  const newBlog1 = {
    author: "Maya",
    url: "www.amazon.com/blog/amazedballs",
  }

  const newBlog2 = {
    title: "hi",
    author: "Maya",
  }

  await api
    .post('/api/blogs')
    .send(newBlog1)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)

  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)

})

afterAll(async () => {
  await mongoose.connection.close()
})