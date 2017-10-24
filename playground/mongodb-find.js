// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	
	console.log('Connect to MongoDB server');

	// db.collection('Todos').find({
	// 	_id: new ObjectID('59ef5f2eed4aebf8a1dec3a1') 
	// }).toArray().then((res) => {
	// 	console.log(JSON.stringify(res, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	// db.collection('Todos').find({
	// 	_id: new ObjectID('59ef5f2eed4aebf8a1dec3a1') 
	// }).toArray().then((res) => {
	// 	console.log(JSON.stringify(res, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	db.collection('Users').find().count().then((res) => {
		console.log(JSON.stringify(res, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});

	// db.close();
});