import { View, Image, StyleSheet, Pressable } from 'react-native'
import * as Linking from 'expo-linking'
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
  fullButton: {
    marginTop: 10,
    padding: 20,
    width: '100%',
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

const Item = ({ props, single }) => {
  const LinkHandler = (url) => {
    Linking.openURL(url)
  }
  return (
    <View
      style={styles.container}
      testID='repositoryItem'>
      <View style={styles.top}>
        <Image
          style={styles.tinyLogo}
          source={{ url: props.ownerAvatarUrl }}
        />
        <View style={styles.infoContainer}>
          <Text
            style={styles.info}
            fontWeight='bold'
            fontSize='subheading'
            testID='fullName'>
            {props.fullName}
          </Text>
          <Text style={styles.info}>{props.description}</Text>
          <Text
            style={styles.tag}
            color='textWhite'>
            {props.language}
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.badges}>
          {props.stargazersCount > 999 ? (
            <Text
              style={{ alignSelf: 'center' }}
              fontWeight='bold'>
              {(props.stargazersCount / 1000).toFixed(1)}k
            </Text>
          ) : (
            <Text
              style={{ alignSelf: 'center' }}
              fontWeight='bold'>
              {props.stargazersCount}
            </Text>
          )}
          <Text style={{ alignSelf: 'center' }}>Stars</Text>
        </View>
        <View style={styles.badges}>
          {props.forksCount > 999 ? (
            <Text
              style={{ alignSelf: 'center' }}
              fontWeight='bold'>
              {(props.forksCount / 1000).toFixed(1)}k
            </Text>
          ) : (
            <Text
              style={{ alignSelf: 'center' }}
              fontWeight='bold'>
              {props.forksCount}
            </Text>
          )}
          <Text style={{ alignSelf: 'center' }}>Forks</Text>
        </View>
        <View style={styles.badges}>
          <Text
            style={{ alignSelf: 'center' }}
            fontWeight='bold'>
            {props.reviewCount}
          </Text>
          <Text style={{ alignSelf: 'center' }}>Reviews</Text>
        </View>
        <View style={styles.badges}>
          <Text
            style={{ alignSelf: 'center' }}
            fontWeight='bold'>
            {props.ratingAverage}
          </Text>
          <Text style={{ alignSelf: 'center' }}>Rating</Text>
        </View>
      </View>
      {single ? (
        <Pressable
          onPress={() => {
            LinkHandler(props.url)
          }}>
          <View style={styles.fullButton}>
            <Text
              color='textWhite'
              style={{ alignSelf: 'center' }}
              >
              Open in GitHub
            </Text>
          </View>
        </Pressable>
      ) : null}
    </View>
  )
}

export default Item
