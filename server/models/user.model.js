const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _pick = require('lodash/pick');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true
	},
	email: {
		type: String,
		trim: true,
		required: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email',
			isAsync: true
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

//Methods and helps
require('./userMethods/toJSON.js')(UserSchema);
require('./userMethods/generateAuthToken.js')(UserSchema);
require('./userMethods/removeToken.js')(UserSchema);
require('./userMethods/findByToken.static.js')(UserSchema);
require('./userMethods/findByCredentials.static.js')(UserSchema);
require('./userMethods/hashingPassword.js')(UserSchema);
let UserModel =  mongoose.model('Users', UserSchema);
module.exports = { UserModel };

