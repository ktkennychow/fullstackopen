import { View, StyleSheet, Pressable, Alert } from 'react-native'
import Constants from 'expo-constants'

import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 100,
    justifyContent: 'center',
    backgroundColor: theme.backgroundColor.dark,
    paddingLeft: 10,
  },
  // ...
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab name="Repository" />
    </View>
  )
}

export default AppBar
