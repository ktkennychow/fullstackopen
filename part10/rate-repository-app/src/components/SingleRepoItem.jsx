import { View } from 'react-native'
import { useParams } from 'react-router-native'
import useSingleRepo from '../hooks/useSingleRepo'
import Item from './RepositoryItem'
import Text from './Text'

const SingleRepoItem = () => {
  const { id } = useParams()
  console.log('comp', id)
  const { data, error, loading } = useSingleRepo(id)

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
  console.log('comp return', data)
  return <Item props={data.repository} single={true} />
}

export default SingleRepoItem
