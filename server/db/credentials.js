const db_test = 'mongodb://localhost:27017/TodoAppTest';
const db_prod = 'mongodb://admin:123456@ds235785.mlab.com:35785/todo-list';
const db_dev = 'mongodb://localhost:27017/TodoApp';

const port_test = '5050';
const port_prod = process.env.PORT;
const port_dev = '3000';

module.exports = {
	db_test, 
	db_prod,
	db_dev,
	port_test, 
	port_prod,
	port_dev
};