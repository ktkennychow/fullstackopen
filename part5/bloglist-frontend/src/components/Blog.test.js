import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('url and likes are shown after view button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John',
    url: 'www.example.com',
    likes: 100
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} handleView={mockHandler} />)
  const div = container.querySelector('.blog')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  screen.debug()

  expect(div).toHaveTextContent('www.example.com')
  expect(div).toHaveTextContent('100')
})
