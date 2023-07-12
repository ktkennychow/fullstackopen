import { useQuery } from '@apollo/client';
import { GET_REPO_REVIEW } from '../graphql/queries';

const useReviews = ({ id, first }) => {
  const { data, fetchMore, loading, ...result } = useQuery(GET_REPO_REVIEW, {
    variables: { repositoryId: id, first },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first
      }
    })
  }

  return { reviews: data?.repository.reviews, fetchMore: handleFetchMore, loading, ...result };
};

export default useReviews;