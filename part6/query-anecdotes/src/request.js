import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdotes = async newAnecdote => {
  if (newAnecdote.content.length >= 5) {
    await axios.post(baseUrl, newAnecdote)
    return newAnecdote
  }
  if (newAnecdote.content.length < 5) {
    throw new Error('the length must be greater than 5')
  }
}
export const updateAnecdotes = async updatedAnecdote => {
  await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  return updatedAnecdote
}