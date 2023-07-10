import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useRepositories = ({ sortBy, debouncedSearchKeyword }) => {
  console.log(debouncedSearchKeyword)
  const [sortFilter, setSortFilter] = useState(["CREATED_AT", "DESC"])
  const sorts = {
    "Lastest Repositories": ["CREATED_AT", "DESC"],
    "Highest Rated Repositories": ["RATING_AVERAGE", "DESC"],
    "Lowest Rated Repositories": ["RATING_AVERAGE", "ASC"]
  }
  useEffect(() => {
    setSortFilter(sorts[sortBy])
  }, [sortBy])

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: sortFilter[0], orderDirection: sortFilter[1], searchKeyword: debouncedSearchKeyword },
    fetchPolicy: 'cache-and-network',
  });
  return { data, error, loading };
};

export default useRepositories;