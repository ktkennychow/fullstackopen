import { FlatList, View, StyleSheet, Pressable, Modal } from 'react-native'
import Constants from 'expo-constants'
import { useNavigate } from 'react-router-native'
import Item from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import Text from './Text'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  sortBar: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    fontSize: 24,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  picker: {
    backgroundColor: '#ddd',
    marginTop: Constants.statusBarHeight + 50,
    width: '100%',
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  navigate,
  sortBy,
  setSortBy,
}) => {
  const [showSortOptions, setShowSortOptions] = useState(false)
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []
  return (
    <>
      <Modal
        animationType='fade'
        visible={showSortOptions}
        transparent={true}>
        <Picker
          style={styles.picker}
          selectedValue={sortBy}
          onValueChange={(itemValue, itemIndex) => {
            setSortBy(itemValue)
            setShowSortOptions(false)
          }}>
          <Picker.Item
            label='Lastest Repositories'
            value='Lastest Repositories'></Picker.Item>
          <Picker.Item
            label='Highest Rated Repositories'
            value='Highest Rated Repositories'></Picker.Item>
          <Picker.Item
            label='Lowest Rated Repositories'
            value='Lowest Rated Repositories'></Picker.Item>
        </Picker>
      </Modal>

      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigate(`/${item.id}`)
              }}>
              <Item props={item} />
            </Pressable>
          )
        }}
        ListHeaderComponent={
          <View>
            <Pressable
              onPress={() => {
                setShowSortOptions(true)
              }}>
              <View style={styles.sortBar}>
                <Text style={{ fontSize: 18 }}>{sortBy}</Text>
                <Text style={{ fontSize: 18 }}>▼</Text>
              </View>
            </Pressable>
          </View>
        }
        keyExtractor={(item) => item.id}
        fontSize='subheading'
      />
    </>
  )
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('Lastest Repositories')
  const { data, error, loading } = useRepositories(sortBy)

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
      sortBy={sortBy}
      setSortBy={setSortBy}
      repositories={data.repositories}
      navigate={navigate}
    />
  )
}

export default RepositoryList
