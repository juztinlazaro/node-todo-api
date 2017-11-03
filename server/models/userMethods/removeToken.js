const mongoose = require('mongoose');

module.exports = (UserSchema) => {
	UserSchema.methods.removeToken = function (token) {
		var user = this;
		//$pull operator remove items in array that match
		return user.update({
			$pull: {
				tokens: { token: token }
			}
		})
	};
};