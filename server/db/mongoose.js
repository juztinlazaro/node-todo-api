const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

//We can use callback in mongoose by default, but nah
// promise is love. Tell mongoose which promise library will use.
mongoose.Promise = global.Promise;

//old approach
//connect to mongodb
// mongoose.connect('mongodb://localhost:27017/TodoApp');

//db conditions
let db;
let port;
var env = process.env.NODE_ENV || 'development';

if(env === 'development') {
	db = 'mongodb://localhost:27017/TodoApp';
	port = 3000;
} else if(env === 'production') {
	db = 'mongodb://juztinlazaro:123456@ds235785.mlab.com:35785/todo-list';
	port = process.env.PORT;
} else if(env === 'test') {
  db = 'mongodb://localhost:27017/TodoAppTest';
  port = 5050;
}

//New approach
mongoose.connect(db, {
  useMongoClient: true,
  /* other options */
});

module.exports = { mongoose, port };