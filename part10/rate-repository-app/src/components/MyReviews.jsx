import { FlatList,StyleSheet, View } from 'react-native'
import useGetCurrentUser from '../hooks/useGetCurrentUser'
import Text from './Text'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },})

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
  const { data, loading } = useGetCurrentUser(true)
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  const reviewsNodes = data ? data.me.reviews.edges.map((edge) => edge.node) : []

  return (
    <View>
      <FlatList
        data={reviewsNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
        fontSize='subheading'
      />
    </View>
  )
}

export default MyReviews
