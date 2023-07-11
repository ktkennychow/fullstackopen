import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPO } from '../graphql/queries';

const useSingleRepo = (id) => {
  const { data, error, loading } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
  });
  return { data, error, loading };
};

export default useSingleRepo;