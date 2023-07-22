const express = require('express');
const router = express.Router();
const { createClient } = require('redis');
const redisClient = createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));

router.get('/', async (req, res) => {
  redisClient.get('counter', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
      res.send({
        added_todos: data
      });
    }
  })

})



module.exports = router;
