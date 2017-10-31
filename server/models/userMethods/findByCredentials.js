const mongoose = require('mongoose');
const { UserSchema } = require('../user.model');

UserSchema.statics.findByCredentials = function(username, email, password) {

};

module.exports = { findByCredentials };