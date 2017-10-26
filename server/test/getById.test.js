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


//wipe all of todos for testing
beforeEach((done) => {
 TodoModel.remove({}).then(() => {
     return TodoModel.insertMany(todos)
 }).then(() => done());
});


describe('GET /TODOS/:id', () => {
	it('should return to doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			}).catch((error) => {
				console.log('error', error);
				done(error);
			}) 
	});
});