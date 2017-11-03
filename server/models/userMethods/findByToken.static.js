const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (UserSchema) => {
  //instance method
  UserSchema.statics.findByToken  = function(token) {
    var User = this;

    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
          var delete_token = User.update({
            $pull: {
              tokens: { token: token }
            }
          }, (e, result) => {
           console.log('err', e);
           console.log('se', result);
          });
          reject(err.message);
       } else {
          const data = User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
          });
          resolve(data);
        }
      })
    });

   // try { old
    //  decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch(e) {
    //  // return new Promise((resolve, reject) => {
    //  //  reject();
    //  // })

    //  return Promise.reject('Undefined token');
    // }

    // return User.findOne({
    //  '_id': decoded._id,
    //  'tokens.token': token,
    //  'tokens.access': 'auth'
    // });
  };
}