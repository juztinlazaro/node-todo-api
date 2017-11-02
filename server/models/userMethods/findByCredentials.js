const mongoose = require('mongoose');
const { UserSchema } = require('../user.model');
const bcrypt = require('bcryptjs');

module.exports = (UserSchema) => {
  UserSchema.methods.findByCredentials = function(username, email, password) { 
  	var User = this;

		return User.findOne({email}).then((user) => {
			if(!user) {
				return Promise.reject('Invalid email address or password')
			}

			return new Promise((resolve, reject) => {
				bcrypt.compare(password, user.password, (err, res) => {
					if(res) {
						resolve(user);
					} else {
						reject('Somethings wrong about your email address or password');
					}
				});
			});
		});
  }
}