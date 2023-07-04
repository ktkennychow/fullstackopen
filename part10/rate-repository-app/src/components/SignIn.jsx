import { View, Pressable, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import { Formik } from 'formik'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  inputField: {
    padding: 20,
    fontSize: theme.fontSizes.subheading,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20
  },
  button: {
    padding: 20,
    color: theme.colors.textWhite,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: theme.fontSizes.subheading,
    fontStyle: theme.fontWeights.bold,
    color: theme.colors.textWhite
  },
})

const SignIn = () => {
  return (
    <Formik>
      <View style={styles.container}>
        <FormikTextInput
          name='username'
          placeholder='Username'
          style={styles.inputField}
        />
        <FormikTextInput
          secureTextEntry={true}
          name='password'
          placeholder='Password'
          style={styles.inputField}
        />
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    </Formik>
  )
}

export default SignIn
