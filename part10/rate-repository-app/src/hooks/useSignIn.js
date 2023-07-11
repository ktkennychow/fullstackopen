import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATION } from '../graphql/queries';

import { useContext } from 'react'
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(AUTHENTICATION)

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { credentials: { username, password } } })

    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore();
    return data
  }
  return [signIn, result]
};

export default useSignIn;