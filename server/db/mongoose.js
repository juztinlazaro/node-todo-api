const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const { db_test, 
	db_prod,
	db_dev,
	port_test, 
	port_prod,
	port_dev 
} = require('./credentials.js')

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
	db = db_dev;
	port = port_dev;
} else if(env === 'production') {
	db = db_prod;
	port = port_prod;
} else if(env === 'test') {
  db = db_test;
  port = port_test;
}

//New approach
mongoose.connect(db, {
  useMongoClient: true,
  /* other options */
});

module.exports = { mongoose, port };