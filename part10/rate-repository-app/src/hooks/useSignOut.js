import { useApolloClient } from '@apollo/client';

import { useContext } from 'react'
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore();
  }
  return [signOut]
};

export default useSignOut;