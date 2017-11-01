const express = require('express');
const logoutRoute = express.Router();
const { UserModel } = require('../models/user.model');
const { authenticate } = require('../middleware/authenticate');

logoutRoute.delete('/', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send({
			status: 200,
			statusMessage: 'user logout'
		});
	}, () => {
		res.status(400).send();
	});
});

module.exports = { logoutRoute };