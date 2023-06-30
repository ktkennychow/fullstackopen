import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'

import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: Constants.statusBarHeight,
    height: 100,

    backgroundColor: theme.backgroundColor.dark,
    paddingLeft: 20,
  },
})

const AppBar = () => {
  return (
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
  )
}

export default AppBar
