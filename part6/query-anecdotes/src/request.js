import axios from 'axios'

export const getAnecdotes = () =>
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const createAnecdotes = newAnecdote => {
  console.log(newAnecdote)
  if (newAnecdote.content.length >= 5) {
    axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data)
  }
  if (newAnecdote.content.length <5) {
    throw new Error('the length must be greater than 5')
  }
}