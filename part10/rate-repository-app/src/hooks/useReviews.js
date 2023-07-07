import { useQuery } from '@apollo/client';
import { GET_REPO_REVIEW } from '../graphql/queries';

const useReviews = (id) => {
  console.log('hook',id)
  const { data, error, loading } = useQuery(GET_REPO_REVIEW, {
    variables: {repositoryId: id},
  });
  console.log('return data', data)
  return { data, error, loading };
};

export default useReviews;