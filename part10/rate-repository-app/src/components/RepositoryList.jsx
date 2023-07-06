import { FlatList, View, StyleSheet } from 'react-native'
import Item from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import Text from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ( {repositories} ) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(item) => <Item props={item} />}
      keyExtractor={(item) => item.id}
      fontSize='subheading'
    />
  )
}

const RepositoryList = () => {
  const {data,error,loading} = useRepositories()
  
  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return <RepositoryListContainer repositories={data.repositories} />
}

export default RepositoryList
