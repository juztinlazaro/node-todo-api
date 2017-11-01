const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../../server');
const { TodoModel } = require('./../models/todo.model');
const {todos, users, populateTodos, populateUsers} = require('./seed/seed');

describe('GET /TODOS/:id', () => {
	//wipe all of todos for testing
	beforeEach(populateTodos);
	beforeEach(populateUsers);

	it('should return to doc', (done) => {
		request(app)
			.get(`/todos/get/${todos[0]._id.toHexString()}`)
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should not return todo doc created by other user', (done) => {
		request(app)
			.get(`/todos/get/${todos[1]._id.toHexString()}`)
			.set('x-auth', users[0].tokens[0].token)
			.expect(404)
			.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		.get(`/todos/get/${hexId}`)
		.set('x-auth', users[0].tokens[0].token)
		.expect(404)
		.end(done);
	});

	it('should return 404 for non object ids', (done) => {
		request(app)
			.get('/todos/get/1234ab')
			.set('x-auth', users[0].tokens[0].token)
			.expect(404)
			.end(done);
	});
});