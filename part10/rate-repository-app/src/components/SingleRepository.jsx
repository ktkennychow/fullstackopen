import { FlatList, StyleSheet, View } from 'react-native'
import { useParams } from 'react-router-native'
import useSingleRepo from '../hooks/useSingleRepo'
import Item from './RepositoryItem'
import Text from './Text'
import useReviews from '../hooks/useReviews'
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
  const { repository, loading: repositoryLoading } = useSingleRepo(id)
  const {
    reviews,
    loading: reviewsLoading,
    fetchMore,
  } = useReviews({ id, first: 2 })

  if (repositoryLoading || reviewsLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
  console.log(111222,reviews.edges)
  console.log(111444,repository)
  const onEndReach = () => {
    console.log(3123213412312)
    fetchMore()
  }

  const reviewsNodes = reviews ? reviews.edges.map((edge) => edge.node) : []
  
  return (
    <FlatList
      data={reviewsNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </>
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
    />
  )
}

export default SingleRepository
