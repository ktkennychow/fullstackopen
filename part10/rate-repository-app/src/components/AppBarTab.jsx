import { Pressable } from 'react-native'
import Text from './Text'
import { Link } from 'react-router-native'

const AppBarTab = ({ name, link, onPress }) => {
  return (
    onPress
    ? <Pressable
    style={{marginRight: 20}}
      onPress={onPress}>
        <Text
          fontSize='subheading'
          fontWeight='bold'
          color='textWhite'>
          {name}
        </Text>
    </Pressable>
    : link 
    ? <Pressable
    style={{marginRight: 20}}
      onPress={onPress}>
      <Link to={link}>
        <Text
          fontSize='subheading'
          fontWeight='bold'
          color='textWhite'>
          {name}
        </Text>
      </Link>
    </Pressable>
    : null
  )
}

export default AppBarTab
