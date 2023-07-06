import { View, Pressable, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import { Formik } from 'formik'
import theme from '../theme'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  inputField: {
    padding: 20,
    fontSize: theme.fontSizes.subheading,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  button: {
    padding: 20,
    color: theme.colors.textWhite,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: theme.fontSizes.subheading,
    fontStyle: theme.fontWeights.bold,
    color: theme.colors.textWhite,
  },
})

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const SignInFrom = ({ onSubmit }) => {
  return (
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
      <Pressable
        onPress={onSubmit}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}


export const SignInContainer = ({onSubmit}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInFrom onSubmit={handleSubmit} />}
    </Formik>
  )
}
const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await signIn({ username, password })
      navigate('/')
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SignInContainer onSubmit={onSubmit}/>
  )
}

export default SignIn
