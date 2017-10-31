const { ObjectID } = require('mongodb');
const { TodoModel } = require('../../models/todo.model');
const { UserModel } = require('../../models/user.model');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userOneTwo = new ObjectID();
const users = [{
	_id: userOneId,
	username: 'juztinlazaro',
	email: 'juztinlazaro@gmail.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}]
}, {
	_id: userOneTwo,
	username: 'ronzielrowy',
	email: 'ronzielrowy@gmail.com',
	password: 'userTwoPass'
}];

const todos = [{
	_id: new ObjectID(),
 text: 'First test todo'
	}, {
	_id: new ObjectID(),
	text: 'Secobnd test todo',
	completed: true,
	completedAt: 121
}];

const populateTodos = (done) => {
  TodoModel.remove({}).then(() => {
    return TodoModel.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  UserModel.remove({}).then(() => {
    var userOne = new UserModel(users[0]).save();
    var userTwo = new UserModel(users[1]).save();

   	return Promise.all([userOne,userTwo]);
  }).then(() => done());
};

module.exports = {
	todos, 
	populateTodos,
	users,
	populateUsers
};