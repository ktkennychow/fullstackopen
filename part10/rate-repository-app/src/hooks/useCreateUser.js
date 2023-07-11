import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/queries';


const useCreateUser = () => {

  const [mutate, result] = useMutation(CREATE_USER)
  const apolloClient = useApolloClient()

  const createUser = async ({ username, password }) => {
    const { data } = await mutate({ variables: { user: { username, password } } })
    apolloClient.resetStore()
    console.log(888, data)
    return data.createUser
  }
  return [createUser, result]
};

export default useCreateUser;