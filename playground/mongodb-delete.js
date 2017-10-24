// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	
	console.log('Connect to MongoDB server');

 //deleteMany 
 // db.collection('Todos').deleteMany({text: 'Something to do'}).then((res) => {
 // 	 console.log(res);
 // });
 
 //deleteOne
 // db.collection('Todos').deleteOne({text: 'Walk the dog'}).then((result) => {
 // 	console.log(result);
 // });

 //findOneAndDelete	
 	// db.collection('Todos').findOneAndDelete({text: 'Dinner'}).then((result) => {
	 // 	console.log(result);
	 // }, (err) => {
	 // 	 console.log(err);
	 // });
	// db.close();
});