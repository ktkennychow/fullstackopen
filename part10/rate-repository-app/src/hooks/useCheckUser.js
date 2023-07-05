import { useQuery } from '@apollo/client';
import { CHECK_USER } from '../graphql/queries';

const useCheckUser = () => {
  const { data, error, loading } = useQuery(CHECK_USER, {
    fetchPolicy: 'cache-and-network',
  });
  return {data, error, loading};
};

export default useCheckUser;