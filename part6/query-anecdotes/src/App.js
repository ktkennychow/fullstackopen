import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdotes } from './request'

const App = () => {
  const queryClient = new useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdotes, {
    onSuccess: (updatedAnecdote) => {
      console.log(updatedAnecdote)
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
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
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
