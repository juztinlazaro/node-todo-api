const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { TodoModel } = require('./../server/models/todo.model');
const { UserModel } = require('./../server/models/user.model');

// TodoModel.remove({}).then((result) => {
// 	console.log(result);
// });

//TodoModel.findOneAndRemove
//Todo.findByIdAndRemove

TodoModel.findByIdAndRemove('59f30a80820d812cc859218a').then((todo) => {
	console.log(todo);
});