const express = require('express');
const route = express.Router();

route.get('/', (request, response) => {
	// response.send('Hello express');
	response.render('home.hbs', { 
		pageTitle: 'API DOCUMENTATION',
	});
});

module.exports = { route };
