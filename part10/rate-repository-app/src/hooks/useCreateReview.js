import { useApolloClient, useMutation } from '@apollo/client';
import {CREATE_REVIEW } from '../graphql/queries';


const useCreateReview = () => {

  const [mutate, result] = useMutation(CREATE_REVIEW)
  const apolloClient = useApolloClient()

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    const { data } = await mutate({ variables: { review: { ownerName, rating, repositoryName, text } } })
    apolloClient.resetStore()
    return data.createReview
  }
  return [createReview, result]
};

export default useCreateReview;