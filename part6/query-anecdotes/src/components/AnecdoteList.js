import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdotes } from '../request'
import NotificationContext from '../NotificationContext'

const AnecdoteList = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = new useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdotes, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
      dispatch({ type: "VOTE", content: updatedAnecdote.content })
    }
  })
  const handleVote = (anecdote) => {
    anecdote.votes = anecdote.votes + 1
    updateAnecdoteMutation.mutate(anecdote)
  }
  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    { retry: 3 }
  )

  if (result.status === 'loading') {
    return <span>Loading...</span>
  }

  if (result.status === 'error') {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data


  console.log(anecdotes)
  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
