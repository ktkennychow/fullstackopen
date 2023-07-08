import { View, Pressable, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import { Formik } from 'formik'
import theme from '../theme'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'
import useCreateUser from '../hooks/useCreateUser'
import useSignIn from '../hooks/useSignIn'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  inputField: {
    paddingTop: 20,
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
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null],"Passwords do not match")
    .required('Password confirmation is required'),
})

const SignUpFrom = ({ onSubmit }) => {
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
      <FormikTextInput
        secureTextEntry={true}
        name='passwordConfirmation'
        placeholder='Password Confirmation'
        style={styles.inputField}
      />
      <Pressable
        onPress={onSubmit}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  )
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpFrom onSubmit={handleSubmit} />}
    </Formik>
  )
}
const SignUp = () => {
  const [createUser] = useCreateUser()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const createUserData = await createUser({
        username,
        password
      })
      const signInData = await signIn({username, password})
      navigate('/')
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
