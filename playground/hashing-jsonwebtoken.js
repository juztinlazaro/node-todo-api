const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var data = {
	id: 10
};


const token = jwt.sign(data, '123abc');
console.log('sign token ******', token);

const decoded = jwt.verify(token, '123abc');
console.log('decoded ******', decoded);

var password = '1234dsad'

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		console.log('hash******', hash);
	})
});

var hashedPassword = '$2a$10$soNE60LOk3tIeve22OIo0.rZY2k5l3DuhtZ.ME1JWEo/pDR8et4MG';

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log('ress**', res);
})
