const mongoose = require('mongoose');
const validator = require('validator');

// User || email - required - trim - set type - set minlength of 1
var UserModel =  mongoose.model('Users', {
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
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

module.exports = { UserModel };

