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
	text: 'Second test todo'
}];


describe('DELETE /todos/', () => {
	beforeEach((done) => {
		TodoModel.remove({}).then(() => {
			return TodoModel.insertMany(todos);
		}).then(() => done());
	});

	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString()
		request(app)
			.delete(`/todos/delete/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				} 

				TodoModel.findById(hexId).then((todo) => {
					expect(null).toNotExist();
					done();
				}).catch((err) => done(err));
			});
	})

	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		.delete(`/todos/delete/${hexId}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 if ObjectID is invalid', (done) => {
		request(app)
			.delete('/todos/delete/321')
			.expect(404)
			.expect((res) => {
				console.log(res.body);
			})
			.end(done);
	});
});