const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { user: 0, likes: 0})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (username.length < 3) {
    response.status(401).json({ error: 'Invalid username(minimum length: 3)' })
  } else if (password.length < 3) {
    response.status(401).json({ error: 'Invalid password(minimum length: 3)' })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter