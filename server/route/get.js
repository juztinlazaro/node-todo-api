const express = require('express');
const todoGetRouter = express.Router();

var { TodoModel } = require('../models/todo.model');

todoGetRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next()
});

todoGetRouter.get('/todos', (req, res) => {
	TodoModel.find().then((todos) => {
		res.send({
			todos,
			status: 200
		});
	}, (e) => {
		res.status(400).send(e);
	});
});

module.exports = { todoGetRouter };

