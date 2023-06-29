import { Pressable, Alert } from 'react-native'
import Text from './Text'
import { Link } from 'react-router-native'

const AppBarTab = ({ name, link }) => {
  return (
    <Pressable
      onPress={() => {
        Alert.alert('1212')
      }}>
      <Link to={link}>
        <Text
          fontSize='subheading'
          fontWeight='bold'
          color='textWhite'>
          {name}
        </Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
