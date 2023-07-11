import { FlatList, StyleSheet, View } from 'react-native'
import { useParams } from 'react-router-native'
import useSingleRepo from '../hooks/useSingleRepo'
import Item from './RepositoryItem'
import Text from './Text'
import useReviews from '../hooks/useReviews'
import theme from '../theme'
import ReviewItem from './ReviewItem'

const RepositoryInfo = ({ repository }) => {
  return (
    <Item
      props={repository}
      single
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})


const ItemSeparator = () => <View style={styles.separator} />

const SingleRepository = () => {
  const { id } = useParams()
  console.log('comp', id)
  const repository = useSingleRepo(id)
  const reviews = useReviews(id)

  if (repository.loading || reviews.loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
  const reviewsNodes = reviews
    ? reviews.data.repository.reviews.edges.map((edge) => edge.node)
    : []
  return (
    <FlatList
      data={reviewsNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository.data.repository} />
          <ItemSeparator />
        </>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository
