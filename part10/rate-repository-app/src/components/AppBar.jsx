import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'
import useSignOut from '../hooks/useSignOut'
import { useNavigate } from 'react-router-native'
import useGetCurrentUser from '../hooks/useGetCurrentUser'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor.dark,
  },
  contentContainer: {
    paddingTop: Constants.statusBarHeight + 10,
    height: 100,
    paddingLeft: 20,
  },
})

const AppBar = () => {
  const [signOut] = useSignOut()
  const navigate = useNavigate()
  const { data, loading } = useGetCurrentUser(false)
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  const signOutHandler = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        directionalLockEnabled
        bounces={false}
        contentContainerStyle={styles.contentContainer}>
        <AppBarTab
          name='Repositories'
          link='/'
        />
        {data.me ? (
          <>
            <AppBarTab
              name='Create a review'
              link='/create-review'
            />
            <AppBarTab
              name='My reviews'
              link='/my-reviews'
            />
            <AppBarTab
              name='Sign out'
              onPress={() => {
                signOutHandler()
              }}
            />
          </>
        ) : (
          <>
            <AppBarTab
              name='Sign in'
              link='signin'
            />
            <AppBarTab
              name='Sign up'
              link='signup'
            />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
