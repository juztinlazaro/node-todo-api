const express = require('express');
const userGetMeRouter = express.Router();
const { authenticate } = require('../middleware/authenticate');


userGetMeRouter.get('/', authenticate, (req, res) => {
	res.send(req.user);
});

module.exports = { userGetMeRouter };