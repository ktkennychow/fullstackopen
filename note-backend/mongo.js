require('dotenv').config()

const mongoose = require('mongoose')
const MONGODB_URI = process.env.TEST_MONGODB_URI


mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'CSS is easy',
  important: false,
})

note.save().then(result => {
  console.log('note saved!', result)
  console.log(note)
  mongoose.connection.close()
})
// Note.find({ important: true }).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })