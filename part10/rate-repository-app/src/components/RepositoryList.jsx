import { FlatList, View, StyleSheet, Pressable, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Constants from 'expo-constants'
import { useNavigate } from 'react-router-native'
import Item from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import Text from './Text'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import TextInput from './TextInput'
import theme from '../theme'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  sortBar: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
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
    marginTop: Constants.statusBarHeight + 53,
    width: '100%',
  },
  searchBar: {
    padding: 15,
    backgroundColor: theme.colors.textWhite,
    fontSize: theme.fontSizes.subheading,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  navigate,
  sortBy,
  setSortBy,
  searchKeyword,
  setSearchKeyword,
  onEndReach,
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
        transparent={true}
        style={{ flex: 1 }}>
        <Pressable
          style={{
            zIndex: -1,
            backgroundColor: 'transparent',
          }}
          onPressOut={() => setShowSortOptions(false)}></Pressable>
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
        <Pressable
          style={{
            zIndex: -1,
            backgroundColor: 'transparent',
            height: '100%',
          }}
          onPressOut={() => setShowSortOptions(false)}></Pressable>
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
            <View style={styles.searchBar}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Icon
                  name='search'
                  size={15}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  name='searchKeyword'
                  placeholder='Search'
                  value={searchKeyword}
                  onChangeText={(value) => setSearchKeyword(value)}></TextInput>
              </View>
              <Pressable onPress={() => setSearchKeyword('')}>
                <Icon
                  name='times'
                  size={15}
                />
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                setShowSortOptions(true)
              }}>
              <View style={styles.sortBar}>
                <Text style={{ fontSize: 16 }}>{sortBy}</Text>
                <Icon
                  name='caret-down'
                  size={16}
                />
              </View>
            </Pressable>
          </View>
        }
        keyExtractor={(item) => item.id}
        fontSize='subheading'
        onEndReached={onEndReach}
        onEndReachedThreshold={0.3}
      />
    </>
  )
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('Lastest Repositories')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 800)
  const { repositories, loading, fetchMore } = useRepositories({
    first:3,
    sortBy,
    searchKeyword: debouncedSearchKeyword,
  })

  const navigate = useNavigate()

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      sortBy={sortBy}
      setSortBy={setSortBy}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      repositories={repositories}
      navigate={navigate}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
