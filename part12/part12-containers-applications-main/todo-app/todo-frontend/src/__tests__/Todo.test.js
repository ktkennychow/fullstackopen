import { render, fireEvent } from '@testing-library/react'
import Todo from '../Todos/Todo'

describe('Todo', () => {
  const mockDelete = jest.fn()
  const mockComplete = jest.fn()

  test('displays the correct text for a completed todo', () => {
    const completedTodo = { text: 'Buy milk', done: true }
    const { getByText } = render(<Todo todo={completedTodo} onClickDelete={mockDelete} onClickComplete={mockComplete} />)
    expect(getByText('This todo is done')).toBeInTheDocument()
    expect(getByText('Buy milk')).toBeInTheDocument()
  })

  test('displays the correct text for an uncompleted todo', () => {
    const uncompletedTodo = { text: 'Buy milk', done: false }
    const { getByText } = render(<Todo todo={uncompletedTodo} onClickDelete={mockDelete} onClickComplete={mockComplete} />)
    expect(getByText('This todo is not done')).toBeInTheDocument()
    expect(getByText('Buy milk')).toBeInTheDocument()
  })

  test('calls the onClickDelete function when Delete button is clicked', () => {
    const uncompletedTodo = { text: 'Buy milk', done: false }
    const { getByText } = render(<Todo todo={uncompletedTodo} onClickDelete={mockDelete} onClickComplete={mockComplete} />)
    fireEvent.click(getByText('Delete'))
    expect(mockDelete).toHaveBeenCalled()
  })

  test('calls the onClickComplete function when Set as done button is clicked', () => {
    const uncompletedTodo = { text: 'Buy milk', done: false }
    const { getByText } = render(<Todo todo={uncompletedTodo} onClickDelete={mockDelete} onClickComplete={mockComplete} />)
    fireEvent.click(getByText('Set as done'))
    expect(mockComplete).toHaveBeenCalled()
  })
})
