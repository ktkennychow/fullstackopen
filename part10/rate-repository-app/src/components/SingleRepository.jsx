import { FlatList, StyleSheet, View } from 'react-native'
import { useParams } from 'react-router-native'
import useSingleRepo from '../hooks/useSingleRepo'
import Item from './RepositoryItem'
import Text from './Text'
import { format } from 'date-fns'
import useReviews from '../hooks/useReviews'
import theme from '../theme'

const RepositoryInfo = ({ repository }) => {
  return (
    <Item
      props={repository}
      single
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  top: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    flexShrink: 1,
  },
  info: {
    paddingBottom: 10,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderWidth: 2.5,
    borderRadius: '50%',
    borderColor: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: theme.fontSizes.subheading,
    fontWeights: theme.fontWeights.bold,
    color: theme.colors.primary
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
  separator: {
    height: 10,
  },
})

const ReviewItem = ({ review }) => {
  return (
    <View
      style={styles.container}
      testID='repositoryItem'>
      <View style={styles.top}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={styles.info}
            fontWeight='bold'
            fontSize='subheading'
            testID='fullName'>
            {review.user.username}
          </Text>
          <Text style={styles.info}>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}
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
  console.log('comp return', repository)
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
