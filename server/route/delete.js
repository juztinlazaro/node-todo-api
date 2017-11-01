const express = require('express');
const todoDeleteRouter = express.Router();

var { TodoModel } = require('../models/todo.model');
const { authenticate } = require('../middleware/authenticate');

todoDeleteRouter.delete('/:id', authenticate, (req, res) => {
	const id = req.params.id;

	TodoModel.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
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