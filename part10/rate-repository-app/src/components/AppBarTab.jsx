import { Pressable, Alert } from 'react-native'
import Text from './Text'

const AppBarTab = ({name}) => {
  return (
    <Pressable
      onPress={() => {
        Alert.alert('1212')
      }}>
      <Text
        fontSize='subheading'
        fontWeight='bold'
        color='textWhite'>
        {name}
      </Text>
    </Pressable>
  )
}

export default AppBarTab
