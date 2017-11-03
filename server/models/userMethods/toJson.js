const mongoose = require('mongoose');
const _pick = require('lodash/pick');

module.exports = (UserSchema) => {
	//what needs to send back to the user
	//remove password and tokens
	UserSchema.methods.toJSON = function() {
		var user = this;
		var userObject = user.toObject();

		return _pick(userObject, ['_id', 'email'])
	}; 
}