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

	return _pick(userObject, ['_id', 'email'])
}; 

//methods, is a object and instance method
// we need to bind
UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({
		_id: user._id.toHexString(),
		access
	}, 'abc123', { expiresIn: '1h' }).toString();

	user.tokens.push({
		access,
		token
	});

	return user.save().then(() => {
		return token;
	});
};

UserSchema.methods.removeToken = function (token) {
	var user = this;
	//$pull operator remove items in array that match
	return user.update({
		$pull: {
			tokens: { token: token }
		}
	})
};

//instance method
UserSchema.statics.findByToken  = function(token) {
	var User = this;
	var decoded; 

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch(e) {
		// return new Promise((resolve, reject) => {
		// 	reject();
		// })

		return Promise.reject('Undefined token');
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.statics.findByCredentials = function(username, email, password) {
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
};

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

// User || email - required - trim - set type - set minlength of 1

let UserModel =  mongoose.model('Users', UserSchema);

module.exports = { UserModel };

