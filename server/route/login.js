const express = require('express');
const loginRoute = express.Router();
const _pick = require('lodash/pick');

loginRoute.post('/', (req, res) => {
	let body =_pick(req.body, ["username", "email", "password"]);
  res.send(body);
});

module.exports = { loginRoute };