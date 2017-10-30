const jwt = require('jsonwebtoken');

var data = {
	id: 10
};


const token = jwt.sign(data, '123abc');
console.log(token);

const decoded = jwt.verify(token + 1, '123abc');
console.log(decoded);