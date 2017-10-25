//SET inter
// var newTodo = new TodoModel({
// 	text: 'Cook Lunch'
// });

var otherTodo = new TodoModel({
	text: '  Edit this videodsadsa  '
});

//SAVE DATA IN MONGODB
// newTodo.save().then((doc) => {
// 	console.log('Saved to do', doc);
// }, (e) => {
// 	console.log('Unable to save todo', e)
// });

otherTodo.save().then((doc) => {
	console.log('Saved to do', doc);
}, (e) => {
	console.log('Unable to save todo', e)
});

var user = new UserModel({
	username: 'testtest',
	email: 'testtest@gmail.com'
});

user.save().then((doc) => {
	console.log('user saved',doc);
}, (err) => {
	console.log('error', err);
});