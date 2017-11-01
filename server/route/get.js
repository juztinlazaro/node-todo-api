const express = require('express');
const todoGetRouter = express.Router();

var { TodoModel } = require('../models/todo.model');
const { authenticate } = require('../middleware/authenticate');

todoGetRouter.get('/', authenticate, (req, res) => {
	TodoModel.find({
		_creator: req.user._id
	}).then((todos) => {
		res.send({
			todos,
			status: 200
		});
	}, (e) => {
		res.status(400).send(e);
	});
});

module.exports = { todoGetRouter };

