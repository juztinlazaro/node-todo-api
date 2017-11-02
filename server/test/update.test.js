const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../../server');
const { TodoModel } = require('./../models/todo.model');
const {todos, users, populateTodos, populateUsers} = require('./seed/seed');;

describe('PATCH /todos', () => {
	beforeEach(populateTodos);
	beforeEach(populateUsers);

	it('should update the todo', (done) => {
		var hexId = todos[0]._id.toHexString();
		var text = 'this should be new text';
		request(app)
			.patch(`/todos/update/${hexId}`)
			.set('x-auth', users[0].tokens[0].token)
			.send({
				text,
				completed: true
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(typeof res.body.todo.completedAt).toBe('number');
			})
			.end(done);
	});

	it('should not update the todo, not owner', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = 'this should be new text';
		request(app)
			.patch(`/todos/update/${hexId}`)
			.set('x-auth', users[0].tokens[0].token)
			.send({
				text,
				completed: true
			})
			.expect(404)
			.end(done);
	});

	it('should clear completedAt when todo is not, completed', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = 'this should be new text';
		request(app)
			.patch(`/todos/update/${hexId}`)
			.set('x-auth', users[1].tokens[0].token)
			.send({
				text,
				completed: false
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toBeFalsy();
			})
			.end(done);
	});
});
