import { useMutation } from '@apollo/client';

import { AUTHENTICATION } from '../graphql/queries';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATION)

const signIn = async ({username, password}) => {
  return await mutate({username, password})
}
  return [signIn, result]
};

export default useSignIn;