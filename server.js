const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');

var { mongoose, port } = require('./server/db/mongoose.js')
var { TodoModel } = require('./server/models/todo.model');
var { UserModel } = require('./server/models/user.model');

var { todoGetRouter } = require('./server/route/get');
var { todoPostRouter } = require('./server/route/post');
var { todoGetByIdRouter } = require('./server/route/getById');
var { todoDeleteRouter } = require('./server/route/delete');
var { todoUpdateRouter } = require('./server/route/update');
var { route } = require('./server/route/routes');

var app = express();

//registerPartials advance templating used for include 
hbs.registerPartials(__dirname + '/views/partials');
//apply handlebards / for templating
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

app.use(route);

app.listen(port, () => {
 console.log(`Started up at port ${port}`);
});

module.exports = { app };
