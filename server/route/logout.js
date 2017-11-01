const express = require('express');
const logoutRoute = express.Router();
const { UserModel } = require('../models/user.model');
const { authenticate } = require('../middleware/authenticate');

logoutRoute.delete('/', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		return res.status(200).send();
	}).catch((error) => {
		res.status(400).send({error});
	});
});

module.exports = { logoutRoute };