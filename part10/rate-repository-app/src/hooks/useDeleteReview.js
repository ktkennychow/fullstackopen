import { useApolloClient, useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/queries';


const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW)
  const apolloClient = useApolloClient()


  const deleteReview = async (id) => {
    const { data } = await mutate({ variables: { deleteReviewId: id } })
    apolloClient.resetStore()

    return data
  }
  return deleteReview
};

export default useDeleteReview;