const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { TodoModel } = require('./../server/models/todo.model');
const { UserModel } = require('./../server/models/user.model');

const id = "59f02ec28ed3af407c3f3aa3";

UserModel.findById(id).then((user) => {
	if(!user) {
		return console.log('User id not found');
	} else {
		console.log('User by id', user);
	}
}).catch((e) => {
	if(!ObjectID.isValid(id)) {
		console.log('ID NOT VALID');
	}
});
