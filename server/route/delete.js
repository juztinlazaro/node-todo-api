const express = require('express');
const todoDeleteRouter = express.Router();

var { TodoModel } = require('../models/todo.model');

todoDeleteRouter.delete('/todos/:id', (req, res) => {
	const id = req.params.id;

	TodoModel.findByIdAndRemove(id).then((todo) => {
		if(!todo) {
			return res.status(404).send({
				status: 404,
				statusMessage: 'Todo is not found',
				todo
			})
		};

		res.send({
			todo,
			status: 200,
			statusMessage: `Todo ${todo.text} has been successfully deleted`
		});

	}).catch((error) => {
		res.status(404).send({
			status: 404,
			statusMessage: 'Invalid ID',
			error
		});
	});
});

module.exports = { todoDeleteRouter };