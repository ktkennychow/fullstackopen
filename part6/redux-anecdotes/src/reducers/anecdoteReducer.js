import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotesSlices',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
    updateAnecdote(state, action) {

      const changedAnecdote = action.payload
      return state
        .map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
        .sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { appendAnecdote, setAnecdote, updateAnecdote } = anecdoteSlice.actions

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

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(changedAnecdote)
    dispatch(updateAnecdote(changedAnecdote))
  }
}
export default anecdoteSlice.reducer