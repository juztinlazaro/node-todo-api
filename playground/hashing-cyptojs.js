	const { SHA256 } = require('crypto-js');

var message = "im a user number 3";
var hash = SHA256(message).toString();

console.log(message);
console.log(hash);

var data = {
	id: 4 
};

var token = {
	data, 
	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

//salt hash, 
//JSON WEB TOKEN
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash) {
	console.log('Data was not changed');
} else {
	console.log('Data was change. Dont trust')
}