import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useGetCurrentUser = (showReviews) => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER, { variables: { includeReviews: showReviews } });
  return { data, error, loading };
};

export default useGetCurrentUser;