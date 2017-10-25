var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var { mongoose } = require('./db/mongoose.js')
var { TodoModel } = require('./models/todo.model');
var { UserModel } = require('./models/user.model');
var { todoGetRouter } = require('./route/get');
var { todoPostRouter } = require('./route/post');


var app = express();

app.use(bodyParser.json());

// This is not namespaced. All routes are as they appear in routes/todo.js
app.use(todoGetRouter);
app.use(todoPostRouter);

// This is namespaced. All routes in routes/user.js will need "/users" before them.
// For example GET /me does not exist. GET /users/me does exist.
// app.use('/users', userRouter);


app.listen(3000, () => {
 console.log('Started on port 3000');
});

module.exports = { app };
