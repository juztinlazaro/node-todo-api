const express = require('express');
const loginRoute = express.Router();
const _pick = require('lodash/pick');
const { UserModel } = require('../models/user.model');
// const { findByCredentials } = require('../models/userMethods/findByCredentials');

loginRoute.post('/', (req, res) => {
	let body =_pick(req.body, ["username", "email", "password"]);
   UserModel.findByCredentials(body.username, body.email, body.password).then((user) => {
  	return user.generateAuthToken().then((token) => {
  		res.header('x-auth', token).status(200).send({
				user,
				status: 200,
        statusMessage: 'User has been login'
			});
  	});
  }).catch((error) => {
  	res.status(400).send({
  		error,
  		status: 400
  	});
  });
});

module.exports = { loginRoute };