const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

module.exports = (UserSchema) => {
	//hashing password
	UserSchema.pre('save', function(next) {
		var user = this;

		if(user.isModified('password')) {
			bcrypt.genSalt(10, (err,salt) => {
				bcrypt.hash(user.password, salt, (err, hash) => {
					user.password = hash;
					next();
				});
			})
		} else {
			next();
		}
	});
}