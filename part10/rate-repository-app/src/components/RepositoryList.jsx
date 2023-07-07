import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import Item from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import Text from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, navigate }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []
  console.log(0,repositoryNodes)
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => {
        return (
          <Pressable
            onPress={() => {
              navigate(`/${item.id}`)
            }}>
            <Item props={item} />
          </Pressable>
        )
      }}
      keyExtractor={(item) => item.id}
      fontSize='subheading'
    />
  )
}

const RepositoryList = () => {
  const { data, error, loading } = useRepositories()
  const navigate = useNavigate()

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      navigate={navigate}
    />
  )
}

export default RepositoryList
