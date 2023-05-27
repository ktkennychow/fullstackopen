require('dotenv')
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
    .set('Authorization', process.env.TEST_TOKEN)
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10_00000)

test('unique identifier property of the blog posts is named id', async () => {
  const res = await api
    .get('/api/blogs')
    .set('Authorization', process.env.TEST_TOKEN)

  console.log(res.body[0].id)
  expect(res.body[0].id).toBeDefined()
})

test('making an HTTP POST request creates a new blog post', async () => {
  const newBlog = {
    title: "I love Jeff Basil",
    author: "Maya",
    url: "www.amazon.com/blog/amazedballs",
  }

  await api
    .post('/api/blogs')
    .set('Authorization', process.env.TEST_TOKEN)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const BlogsAtEnd = await helper.blogsInDb()
  expect(BlogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
}, 10_00000)

test('adding a blog fails with 401 Unauthorized if a token is not provided', async () => {
  const newBlog = {
    title: "no token",
    author: "notoken",
    url: "www.notoken.com",
  }

  await api
    .post('/api/blogs')
    .set('Authorization', "")
    .send(newBlog)
    .expect(401)

}, 10_00000)

test('likes property default to the value 0 when missing', async () => {
  const newBlog = {
    title: "I love Jeff Basil",
    author: "Maya",
    url: "www.amazon.com/blog/amazedballs",
  }

  await api
    .post('/api/blogs')
    .set('Authorization', process.env.TEST_TOKEN)
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
    .set('Authorization', process.env.TEST_TOKEN)
    .send(newBlog1)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', process.env.TEST_TOKEN)
    .send(newBlog2)
    .expect(400)

  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('delete of a post succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', process.env.TEST_TOKEN)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )
  const titles = blogsAtEnd.map(r => r.title)
  console.log(titles)
  console.log(blogToDelete)
  expect(titles).not.toContain(blogToDelete.title)
})

test('add a like succeeds with status code 202 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const originalLikes = blogsAtStart[0].likes
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes++
  console.log(blogToUpdate.likes)
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', process.env.TEST_TOKEN)
    .send(blogToUpdate)
    .expect(202)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length)
  
  const newLikes = blogToUpdate.likes
  expect(newLikes).toEqual(originalLikes + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})