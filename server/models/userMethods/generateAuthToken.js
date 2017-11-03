const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports = (UserSchema) => {
	//methods, is a object and instance method
	// we need to bind
	UserSchema.methods.generateAuthToken = function () {
		var user = this;
		var access = 'auth';
		var token = jwt.sign({
			_id: user._id.toHexString(),
			access
		}, process.env.JWT_SECRET, { expiresIn: '1h' } ).toString();

		user.tokens.push({
			access,
			token
		});

		return user.save().then(() => {
			return token;
		});
	};
}