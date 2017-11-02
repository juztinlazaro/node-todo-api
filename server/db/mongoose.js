require('../config/config.js');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

//We can use callback in mongoose by default, but nah
// promise is love. or tell mongoose which promise library will use.
mongoose.Promise = global.Promise;

//old approach
//connect to mongodb
// mongoose.connect('mongodb://localhost:27017/TodoApp');

//New approach
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
  /* other options */
});

module.exports = { mongoose };