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
	text: 'Second test todo',
	completed: true,
	completedAt: 121
}];

describe('PATCH /todos', () => {
	beforeEach((done) => {
		TodoModel.remove({}).then(() => {
			return TodoModel.insertMany(todos);
		}).then(() => done());
	});

	it('should update the todo', (done) => {
		var hexId = todos[0]._id.toHexString();
		var text = 'this should be new text';
		request(app)
			.patch(`/todos/update/${hexId}`)
			.send({
				text,
				completed: true
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number');
			})
			.end(done);
	});

	it('should clear completedAt when todo is not, completed', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = 'this should be new text';
		request(app)
			.patch(`/todos/update/${hexId}`)
			.send({
				text,
				completed: false
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toNotExist();
			})
			.end(done);
	});
});
