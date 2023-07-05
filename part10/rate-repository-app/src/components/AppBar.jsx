import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'

import theme from '../theme'
import AppBarTab from './AppBarTab'
import useCheckUser from '../hooks/useCheckUser'
import useSignOut from '../hooks/useSignOut'
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
  const {data, loading} = useCheckUser()

  if(loading){
    return <View><Text>Loading...</Text></View>
  }
  const signOutHandler = async () => {
    console.log(312)
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
          name='Repository'
          link='/'
        />
        {data.me ? (
          <AppBarTab
            name='Sign out'
            onPress={() => {
              signOutHandler()
            }}
          />
        ) : (
          <AppBarTab
            name='Sign in'
            link='signin'
          />
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
