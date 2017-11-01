const express = require('express');
const todoPostRouter = express.Router();
var fs = require('fs');
var { TodoModel } = require('../models/todo.model');
const { authenticate } = require('../middleware/authenticate');

todoPostRouter.post('/', authenticate, (req, res) => {
	var todo = new TodoModel({
		text: req.body.text,
		_creator: req.user._id
	});

	var postlogObj = {
		timeStamp: Date()
	};
	
	todo.save().then((todo) => {
		//send back the user info
		res.send({
			todo,
			status: 200,
			statusMessage: 'Success'
		});
		postlogObj["data"] = todo;
		fs.appendFile('server/logs/post-log.json', JSON.stringify(postlogObj, undefined, 2) + ',', (err) => {
			if(err) throw err;
			console.log('data to append was appended to file!');
		});	
	}, (err) => {
		res.status(400).send({
			error: err,
			status: 400
		});
		postlogObj["data"] = err;
		fs.appendFile('server/logs/post-log.json', JSON.stringify(postlogObj, undefined, 2), (err) => {
			if(err) throw err;
			console.log('data to append was error!');
		});	
	});
});

module.exports = { todoPostRouter };