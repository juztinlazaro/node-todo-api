const _ = require('lodash');
const { ObjectID } = require('mongodb');
const express = require('express');
const todoUpdateRouter = express.Router();

var { TodoModel } = require('../models/todo.model');

todoUpdateRouter.patch('/:id', (req, res) => {
	const id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)) {
		return res.status(404).send({
			status: 404,
			statusMessage: 'Invalid ID'
		});
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	TodoModel.findByIdAndUpdate(id, {
		$set: body
	}, { new: true }).then((todo) => {
			if(!todo) {
				return res.status(404).send({
					status: 404,
					statusMessage: 'Todo not found'
				});
			}

			res.status(200).send({
				todo,
				status: 200,
				statusMessage: 'Todo has been updated'
			});
		}).catch((error) => {
			res.status(400).send({
				error,
				status: 400,
				statusMessage: 'Error update'
			});
	});
});


module.exports = { todoUpdateRouter }