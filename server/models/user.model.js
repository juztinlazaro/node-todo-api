const mongoose = require('mongoose');

// User || email - required - trim - set type - set minlength of 1
var UserModel =  mongoose.model('Users', {
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	}
});

module.exports = { UserModel };

