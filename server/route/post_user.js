const _ = require('lodash');
const express = require('express');
const userPostRouter = express.Router();
var fs = require('fs');
const { UserModel } = require('../models/user.model');

userPostRouter.post('/', (req, res) => {	
	let body = _.pick(req.body, ["username", "email", "password"]);
	
	let newUser = new UserModel({
		username: body.username,
		email: body.email,
		password: body.password
	});

	var postlogObj = {
		timeStamp: Date()
	};

	newUser.save().then((user) => {
		return newUser.generateAuthToken();
	})
	.then((token) => {
		res.header('x-auth', token).status(200).send({
			newUser,
			status: 200,
			statusMessage: 'User is saved'
		})
	})
	.catch((error) => {
		res.status(400).send({
			error,
			status: 400
		});
	});
});

module.exports = { userPostRouter };