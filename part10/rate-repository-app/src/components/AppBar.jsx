import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'

import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor.dark,
  },
  contentContainer: {
    paddingTop: Constants.statusBarHeight,
    height: 100,
    paddingLeft: 20,
  },
})

const AppBar = () => {
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
        <AppBarTab
          name='Sign in'
          link='signin'
        />
      </ScrollView>
    </View>
  )
}

export default AppBar
