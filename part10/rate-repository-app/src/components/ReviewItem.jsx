import { StyleSheet, View } from 'react-native'
import Text from './Text'
import { format } from 'date-fns'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  left: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    flexShrink: 1,
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
    color: theme.colors.primary,
  },
})

const ReviewItem = ({ review }) => {
  return (
    <View
      style={styles.container}
      testID='repositoryItem'>
      <View style={styles.left}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          {review.user ? (
            <Text
              style={styles.info}
              fontWeight='bold'
              fontSize='subheading'>
              {review.user.username}
            </Text>
          ) : (
            <Text
              style={styles.info}
              fontWeight='bold'
              fontSize='subheading'
              testID='fullName'>
              {review.repository.fullName}
            </Text>
          )}
          <Text
            style={{
              marginBottom: 10,
              marginTop: 5,
              color: theme.colors.textSecondary,
            }}>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem
