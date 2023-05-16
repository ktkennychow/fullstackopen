const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toHexString()
    returnedObject.likes
      ? returnedObject.likes = returnedObject.likes
      : returnedObject.likes = 0
    delete returnedObject._id
  }
})


module.exports = mongoose.model('Blog', blogSchema)