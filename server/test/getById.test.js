const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../../server');
const { TodoModel } = require('./../models/todo.model');

const todos = [{
	_id: new ObjectID(),
  text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Secobnd test todo'
}];

describe('GET /TODOS/:id', () => {
	//wipe all of todos for testing
	beforeEach((done) => {
	 TodoModel.remove({}).then(() => {
	     return TodoModel.insertMany(todos)
	 }).then(() => done());
	});

	it('should return to doc', (done) => {
		request(app)
			.get(`/todos/get/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		.get(`/todos/get/${hexId}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 for non object ids', (done) => {
		request(app)
			.get('/todos/get/1234ab')
			.expect(404)
			.end(done);
	});
});