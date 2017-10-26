const express = require('express');
const todoPostRouter = express.Router();
var fs = require('fs');
var { TodoModel } = require('../models/todo.model');

todoPostRouter.post('/todos', (req, res) => {
	var todo = new TodoModel({
		text: req.body.text
	});

	var postlogObj = {
		timeStamp: Date()
	};
	
	todo.save().then((doc) => {
		//send back the user info
		res.send(doc);
		postlogObj["data"] = doc;
		fs.appendFile('server/logs/post-log.json', JSON.stringify(postlogObj, undefined, 2));	
	}, (err) => {
		res.status(400).send(err);
		postlogObj["data"] = err;
		fs.appendFile('server/logs/post-log.json', JSON.stringify(postlogObj, undefined, 2));	
	});
});

module.exports = { todoPostRouter };