const express = require('express');
const route = express.Router();

const { todoGetRouter } = require('./get');
const { todoPostRouter } = require('./post');
const { todoGetByIdRouter } = require('./getById');
const { todoDeleteRouter } = require('./delete');
const { todoUpdateRouter } = require('./update');

const { userPostRouter } = require('./post_user');

//VIEWS / PAGES
route.get('/', (request, response) => {
	// response.send('Hello express');
	response.render('home.hbs', { 
		pageTitle: 'API DOCUMENTATION',
	});
});

route.get('/post-todo-docx', (request, response) => {
	// response.send('Hello express');
	response.render('post-todo-docx.hbs', { 
		pageTitle: 'POST API DOCUMENTATION',
	});
});

// This is namespaced. All routes in routes/user.js will need "/users" before them.
// For example GET /me does not exist. GET /users/me does exist.
// app.use('/users', userRouter);

//API
route.use('/todos/get', todoGetRouter);
route.use('/todos/get', todoGetByIdRouter);
route.use('/todos/post', todoPostRouter);
route.use('/todos/delete', todoDeleteRouter);
route.use('/todos/update', todoUpdateRouter);

route.use('/user/post', userPostRouter);

module.exports = { route };
