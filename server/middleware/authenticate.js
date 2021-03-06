const { UserModel } = require('../models/user.model');

var authenticate = (req, res, next) => {
	var token = req.header('x-auth');
	
 UserModel.findByToken(token).then((user) => {
 	if(!user) {
 		return Promise.reject();
 	}
 	req.user = user;
 	req.token = token;
 	next();
 }).catch((error) => {
 	console.log(error);
 		res.status(401).send({
 			error,
 			status: 401
 		});
 });
};

module.exports = { authenticate };