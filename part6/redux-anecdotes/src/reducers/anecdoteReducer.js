import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotesSlices',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      const targetAnecdote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { appendAnecdote, voteFor, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer