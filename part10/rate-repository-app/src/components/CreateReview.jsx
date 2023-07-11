import { View, Pressable, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import { Formik } from 'formik'
import theme from '../theme'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'
import useCreateReview from '../hooks/useCreateReview'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  inputField: {
    paddingTop: 20,
    padding: 20,
    fontSize: theme.fontSizes.subheading,
    backgroundColor: theme.colors.textWhite,
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''

}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).integer().required('Rating is required'),
  text: yup.string(),
})

const CreateReviewFrom = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name='ownerName'
        placeholder='Repository owner name'
        style={styles.inputField}
      />
      <FormikTextInput
        name='repositoryName'
        placeholder='Repository name'
        style={styles.inputField}
      />
      <FormikTextInput
        name='rating'
        placeholder='Rating between 0 and 100'
        style={styles.inputField}
      />
      <FormikTextInput
        name='text'
        placeholder='Review'
        multiline={true}
        style={styles.inputField}
      />
      <Pressable
        onPress={onSubmit}
        style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  )
}

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewFrom onSubmit={handleSubmit} />}
    </Formik>
  )
}
const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values

    try {
      const data  = await createReview({
        ownerName,
        rating: Number(rating),
        repositoryName,
        text,
      })
      navigate(`/${data.repositoryId}`)
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
    }
  }

  return <CreateReviewContainer onSubmit={onSubmit} />
}

export default CreateReview
