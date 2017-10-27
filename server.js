var express = require('express');
var bodyParser = require('body-parser');
const hbs = require('hbs');
var fs = require('fs');

var { mongoose } = require('./server/db/mongoose.js')
var { TodoModel } = require('./server/models/todo.model');
var { UserModel } = require('./server/models/user.model');

var { todoGetRouter } = require('./server/route/get');
var { todoPostRouter } = require('./server/route/post');
var { todoGetByIdRouter } = require('./server/route/getById');
var { todoDeleteRouter } = require('./server/route/delete');
var { route } = require('./server/route/routes');


var app = express();
const port = process.env.PORT || 3000;

//registerPartials advance templating used for include 
hbs.registerPartials(__dirname + '/views/partials');
//apply handlebards
app.set('view engine', 'hbs');

//Middleware
app.use(bodyParser.json());
//middleware for static html or file
//custom
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	//logger
	console.log(log);
	fs.appendFile('server/logs/server.log', log + '\n', (err) => {
		if(err) {
			console.log("Unable to append to server.log");
		}
	});
	next();
});

//For maintenance page
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');	
// });

// This is not namespaced. All routes are as they appear in routes/todo.js
app.use('/todos/get', todoGetRouter);
app.use('/todos/get', todoGetByIdRouter);
app.use('/todos/post', todoPostRouter);
app.use('/todos/delete', todoDeleteRouter);
app.use(route);

// This is namespaced. All routes in routes/user.js will need "/users" before them.
// For example GET /me does not exist. GET /users/me does exist.
// app.use('/users', userRouter);


app.listen(port, () => {
 console.log(`Started up at port ${port}`);
});

module.exports = { app };
