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


//find by specific data
TodoModel.find({
	_id: id
}).then((todos) => {
	console.log('Todos', todos);
});

//find first item 
TodoModel.findOne({
  _id: id
}).then((todo) => {
	console.log('Todo', todo);
});

//easy af find id
TodoModel.findById(id).then((todo) => {
	if(!todo) {
		return console.log('Id not found');
	}
	console.log('Todo by id', todo);
}).catch((e) => {
	if(!ObjectID.isValid(id)) {
	  console.log('ID NOT VALID');
  }
});