const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _pick = require('lodash/pick');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
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

//what needs to send back to the user
//remove password and tokens
UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();

	return _pick(userObject, ['id', 'email'])
};

//methods, is a object and instance method
// we need to bind
UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({
		_id: user._id.toHexString(),
		access
	}, 'abc123').toString();

	user.tokens.push({
		access,
		token
	});

	return user.save().then(() => {
		return token;
	});
};

// User || email - required - trim - set type - set minlength of 1
let UserModel =  mongoose.model('Users', UserSchema);

module.exports = { UserModel };

