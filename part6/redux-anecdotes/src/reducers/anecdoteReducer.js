import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotesSlices',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
      return state.sort((a, b) => b.votes - a.votes)
    },
    voteFor(state, action) {
      const id = action.payload
      const targetAnecdote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }

})

export const { createAnecdote, voteFor, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}
export default anecdoteSlice.reducer