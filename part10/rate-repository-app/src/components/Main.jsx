import { StyleSheet, View } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import { Route, Routes, Navigate } from 'react-router-native'
import SignIn from './SignIn'
import SingleRepository from './SingleRepository'
import CreateReview from './CreateReview'
import SignUp from './SignUp'

import MyReviews from './MyReviews'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route
          path='/'
          element={<RepositoryList />}
          exact
        />
        <Route
          path='/signin'
          element={<SignIn />}
          exact
        />
        <Route
          path='/signup'
          element={<SignUp />}
          exact
        />
        <Route
          path='/:id'
          element={<SingleRepository />}
        />
        <Route
          path='/create-review'
          element={<CreateReview />}
        />
        <Route
          path='/my-reviews'
          element={<MyReviews />}
        />

        <Route
          path='*'
          element={
            <Navigate
              to='/'
              replace
            />
          }
        />
      </Routes>
    </View>
  )
}

export default Main
