import { Alert, Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import { format } from 'date-fns'
import theme from '../theme'
import { useNavigate } from 'react-router-native'
import useDeleteReview from '../hooks/useDeleteReview'

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
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  button: {
    marginTop: 10,
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
  },
  blue: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  red: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
})

const ReviewItem = ({ review,refetch}) => {
  const navigate = useNavigate()
  const deleteReview = useDeleteReview()

  const deleteHandler = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: () => {
            console.log('delete pressed')
            deleteReview(review.id)
            refetch()
          },
        },
      ]
    )

  return (
    <View
      style={styles.container}
      testID='repositoryItem'>
      <View>
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
      {review.repository ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              navigate(`/${review.repository.id}`)
            }}>
            <View style={[styles.button, styles.blue]}>
              <Text
                color='textWhite'
                style={{
                  alignSelf: 'center',
                  fontWeight: theme.fontWeights.bold,
                }}>
                View repository
              </Text>
            </View>
          </Pressable>
          <View style={{ width: 20 }}></View>
          <Pressable
            style={{ flex: 1 }}
            onPress={deleteHandler}>
            <View style={[styles.button, styles.red]}>
              <Text
                color='textWhite'
                style={{
                  alignSelf: 'center',
                  fontWeight: theme.fontWeights.bold,
                }}>
                Delete review
              </Text>
            </View>
          </Pressable>
        </View>
      ) : null}
    </View>
  )
}

export default ReviewItem
