import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useRepositories = ({ sortBy, searchKeyword, first }) => {
  const [sortFilter, setSortFilter] = useState(["CREATED_AT", "DESC"])
  const sorts = {
    "Lastest Repositories": ["CREATED_AT", "DESC"],
    "Highest Rated Repositories": ["RATING_AVERAGE", "DESC"],
    "Lowest Rated Repositories": ["RATING_AVERAGE", "ASC"]
  }
  useEffect(() => {
    setSortFilter(sorts[sortBy])
  }, [sortBy])
  const { data, fetchMore, loading, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: sortFilter[0], orderDirection: sortFilter[1], searchKeyword, first },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        sortBy, searchKeyword, first
      }
    })
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepositories;