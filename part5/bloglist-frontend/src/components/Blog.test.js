import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('shows title and author but not url or likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John',
    url: 'www.example.com',
    likes: 100
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'John'
  )
  expect(div).not.toHaveTextContent('www.example.com')
  expect(div).not.toHaveTextContent('100')
})

test('url and likes are shown when view button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John',
    url: 'www.example.com',
    likes: 100
  }

  const container = render(<Blog blog={blog} />).container

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('www.example.com')
  expect(div).toHaveTextContent('100')
})

test('like button is clicked twice and mock eventHandler is called twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John',
    url: 'www.example.com',
    likes: 100
  }


  const mockHandleLikes = jest.fn()

  const { container } = render(<Blog blog={blog} handleLikes={mockHandleLikes} />)
  const user = userEvent.setup()

  const div = container.querySelector('.blog')

  const viewButton = screen.getByText('view')
  console.log(viewButton)
  await user.click(viewButton)
  expect(div).toHaveTextContent('www.example.com')

  const likeButton = screen.getByText('like')
  console.log(likeButton)
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandleLikes).toBeCalledTimes(2)
})

test('the form calls the event handler with the right details when a new blog is created', async () => {

  const mockHandleNewBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleNewBlog={mockHandleNewBlog} />)

  const inputTitle = screen.getByPlaceholderText('I am a title')
  await user.type(inputTitle, 'Component testing is done with react-testing-library')
  const inputAuthor = screen.getByPlaceholderText('I am a name')
  await user.type(inputAuthor, 'John')
  const inputUrl = screen.getByPlaceholderText('I am the URL')
  await user.type(inputUrl, 'www.example.com')

  const sendButton = screen.getByText('create')
  await user.click(sendButton)

  expect(mockHandleNewBlog.mock.calls).toHaveLength(1)
  expect(mockHandleNewBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
  expect(mockHandleNewBlog.mock.calls[0][0].author).toBe('John')
  expect(mockHandleNewBlog.mock.calls[0][0].url).toBe('www.example.com')

})


