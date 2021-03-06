const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../../server');
const { TodoModel } = require('./../models/todo.model');
const {todos, users, populateTodos, populateUsers} = require('./seed/seed');;

describe('DELETE /todos/', () => {
	beforeEach(populateTodos);
	beforeEach(populateUsers);

	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString()
		request(app)
			.delete(`/todos/delete/${hexId}`)
			.set('x-auth', users[1].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				} 

				TodoModel.findById(hexId).then((todo) => {
					expect(null).toBeFalsy();
					done();
				}).catch((err) => done(err));
			});
	});

	it('should not remove a todo', (done) => {
		var hexId = todos[0]._id.toHexString()
		request(app)
			.delete(`/todos/delete/${hexId}`)
			.set('x-auth', users[1].tokens[0].token)
			.expect(404)
			.end((err, res) => {
				if(err) {
					return done(err);
				} 

				TodoModel.findById(hexId).then((todo) => {
					expect(todo).toBeTruthy();
					done();
				}).catch((err) => done(err));
			});
	})

	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		.delete(`/todos/delete/${hexId}`)
		.set('x-auth', users[1].tokens[0].token)
		.expect(404)
		.end(done);
	});

	it('should return 404 if ObjectID is invalid', (done) => {
		request(app)
			.delete('/todos/delete/321')
			.set('x-auth', users[1].tokens[0].token)
			.expect(404)
			.end(done);
	});
});