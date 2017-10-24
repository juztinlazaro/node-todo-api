// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	
	console.log('Connect to MongoDB server');
  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  // 	_id: new ObjectID('59ef8d08ed4aebf8a1dec6de')
  // }, {
  // 	$set: {
  // 		completed: false
  // 	}
  // }, {
  // 	returnOriginal: false
  // }).then((res) => {
  // 	console.log(res);
  // });

  db.collection('Users').findOneAndUpdate({
  	_id: new ObjectID('59ee50cbf05f9c3ffc0aa459')
  }, {
  	$set: {
  		name: 'Ronziel'
  	},
  	$inc: {
  		age: 4
  	}
  }, {
  	returnOriginal: false
  }).then((res) => {
  	console.log(res);
  });
	//update 

	//updateMany

	//updateOne

	// db.close();
});