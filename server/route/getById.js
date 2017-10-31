const { ObjectID } = require('mongodb');
const express = require('express');
const todoGetByIdRouter = express.Router();

var { TodoModel } = require('../models/todo.model');

todoGetByIdRouter.get('/:id', (req, res) => {
	const id = req.params.id;

	//Check first if the ID is valid
	if(!ObjectID.isValid(id)) {
		return res.status(404).send({
			statusMessage: 'ID not valid',
			status: 404
		});
	}

	TodoModel.findById(id).then((todo) => {
		if(!todo) {
			res.status(404).send({
				statusMessage: 'todo not exist!',
				status: 404
			});
		} else {
			res.status(200).send({
				todo,
				status: 200,
				statusMessage: 'Success!'
			});
		}
	}).catch((error) => {
		res.status(404).send({
			statusMessage: 'ID is not valid',
			error: error
		});
	});
});

module.exports = { todoGetByIdRouter };