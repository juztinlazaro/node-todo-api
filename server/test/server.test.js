const expect = require('expect');
const request = require('supertest');

const { app } = require('../../server');
const { TodoModel } = require('./../models/todo.model');
const {todos, users, populateTodos, populateUsers} = require('./seed/seed');


//wipe all of todos for testing
describe('POST/todos/', () => {
	beforeEach(populateTodos);
	beforeEach(populateUsers);
	
	it('should create a new todo', (done) => {
		var text = "Yoww";
		request(app)
			.post('/todos/post')
			.set('x-auth', users[0].tokens[0].token)
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
			})
			.end((err,res) => {
				if(err) {
					return done(err);
				}

				TodoModel.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});

	it('Should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos/post')
			.set('x-auth', users[0].tokens[0].token)
			.send({})
			.expect(400)
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				TodoModel.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	});

	describe('GET /todos', () => {
		it('should get all todos', (done) => {
			request(app)
				.get('/todos/get')
				.set('x-auth', users[0].tokens[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body.todos.length).toBe(1);
				})
				.end(done);
		})
	})
});