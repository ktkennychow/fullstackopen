import { useQuery } from 'react-query'
import { getAllUsers } from '../services/users'
import { Link } from 'react-router-dom'

const UsersDisplay = ({ user }) => {
  if (!user) {
    return null
  }
  const usersQuery = useQuery('users', getAllUsers)
  const users = usersQuery.data
  return (
    <>
      <div>
        <h2>Users</h2>
        {usersQuery.isLoading
          ? <div>Loading users...</div>
          : <table>
            <tbody>
              <tr>
                <th></th>
                <th>blogs created</th>
              </tr>
              {
                users.sort((a, b) => a.name - b.name)
                  .map((user) => (
                    <tr key={user.id}>
                      <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </td>
                      <td>{user.blogs.length}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table >
        }
      </div>
    </>
  )
}

export default UsersDisplay