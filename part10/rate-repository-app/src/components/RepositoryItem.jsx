import { View, Image, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

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
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
  badges: {
    flexDirection: 'column',
    textAlign: 'center',
  },
  tag: {
    padding: 10,
    alignSelf: 'start',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    overflow: 'hidden',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
})

const Item = ({ props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.tinyLogo}
          source={{ url: props.item.ownerAvatarUrl }}
        />
        <View style={styles.infoContainer}>
          <Text
            style={styles.info}
            fontWeight='bold'
            fontSize='subheading'>
            {props.item.fullName}
          </Text>
          <Text style={styles.info}>{props.item.description}</Text>
          <Text
            style={styles.tag}
            color='textWhite'>
            {props.item.language}
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.badges}>
          {props.item.stargazersCount > 999 ? (
            <Text
              style={{ alignSelf: 'center' }}
              fontWeight='bold'>
              {(props.item.stargazersCount / 1000).toFixed(1)}k
            </Text>
          ) : (
            <Text
              style={{ alignSelf: 'center' }}
              fontWeight='bold'>
              {props.item.stargazersCount}
            </Text>
          )}
          <Text style={{ alignSelf: 'center' }}>Stars</Text>
        </View>
        <View style={styles.badges}>
          {props.item.stargazersCount > 999 ? (
            <Text
              style={{ alignSelf: 'center' }}
              fontWeight='bold'>
              {(props.item.forksCount / 1000).toFixed(1)}k
            </Text>
          ) : (
            <Text
              style={{ alignSelf: 'center' }}
              fontWeight='bold'>
              {props.item.forksCount}
            </Text>
          )}
          <Text style={{ alignSelf: 'center' }}>Forks</Text>
        </View>
        <View style={styles.badges}>
          <Text
            style={{ alignSelf: 'center' }}
            fontWeight='bold'>
            {props.item.reviewCount}
          </Text>
          <Text style={{ alignSelf: 'center' }}>Reviews</Text>
        </View>
        <View style={styles.badges}>
          <Text
            style={{ alignSelf: 'center' }}
            fontWeight='bold'>
            {props.item.ratingAverage}
          </Text>
          <Text style={{ alignSelf: 'center' }}>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default Item
