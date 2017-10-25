var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var { mongoose } = require('./db/mongoose.js')
var { TodoModel } = require('./models/todo.model');
var { UserModel } = require('./models/user.model');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new TodoModel({
		text: req.body.text
	});

	var postlogObj = {
		timeStamp: Date()
	};
	
	console.log('Request info', JSON.stringify(postlogObj, undefined, 2));

	todo.save().then((doc) => {
		//send back the user info
		res.send(doc);
		postlogObj["data"] = doc;
		fs.writeFileSync('post-log.json', JSON.stringify(postlogObj));	
	}, (err) => {
		res.status(400).send(err);
		postlogObj["data"] = err;
		fs.writeFileSync('post-log.json', JSON.stringify(postlogObj));	
	});
});

app.listen(3000, () => {
 console.log('Started on port 3000');
});

module.exports = { app };