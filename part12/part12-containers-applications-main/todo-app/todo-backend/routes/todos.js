const express = require('express');
const router = express.Router();
const { createClient } = require('redis');
const redisClient = createClient();
const { Todo } = require('../mongo')

redisClient.on('error', err => console.log('Redis Client Error', err));

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  redisClient.get('counter', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      if (parseInt(data) >= 0) {
        redisClient.set('counter', parseInt(data) + 1)
      } else {
        redisClient.set('counter', 1)
      }
    }
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  let todo = req.todo
  if (req.body.text) {
    todo.text = req.body.text
  }
  if (req.body.done) {
    todo.done = req.body.done
  }

  await todo.save()

  res.json(todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)



module.exports = router;
