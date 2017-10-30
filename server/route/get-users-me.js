const express = require('express');
const userGetMeRouter = express.Router();
const { UserModel } = require('../models/user.model');
const { authenticate } = require('../middleware/authenticate');


userGetMeRouter.get('/', authenticate, (req, res) => {
	res.send(req.user);
});

module.exports = { userGetMeRouter };