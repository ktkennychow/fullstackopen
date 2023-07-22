const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { createClient } = require('redis');


const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const counterRouter = require('./routes/counter');

const redisClient = createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.set('counter', 0)

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());



app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/todos/:id', todosRouter);
app.use('/statistics', counterRouter);

module.exports = app;
