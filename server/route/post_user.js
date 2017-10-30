const _ = require('lodash');
const express = require('express');
const userPostRouter = express.Router();
const fs = require('fs');
const { UserModel } = require('../models/user.model');

userPostRouter.post('/', (req, res) => {	
	var body = _.pick(req.body, ['username', 'email', 'password']);
	var user_data = new UserModel(body);

	user_data.save().then((user) => {
		res.status(200).send({
			user,
			status: 200,
			statusMessage: 'Success'
		});
	}).catch((error) => {
		console.log('errrrrrrrrrrrr', error);
		res.status(400).send({
			error,
			status: 400
		})
	});
});

module.exports = { userPostRouter };