const expect = require('expect');
const request = require('supertest');

const { app } = require('../../server');
const { UserModel } = require('./../models/user.model');
const {users, populateUsers} = require('./seed/seed');

describe('POST user/me', () => {
	//wipe all of todos for testing
	beforeEach(populateUsers);

	it('should return if the user is create', (done) => {
		var username = 'juztinlazarodasda'
	  var email = 'example@gmail.com';
	  var password = '12343asdas!';
		request(app)
			.post('/users/post')
			.send({username, email, password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
			})
			.end((err) => {
				if(err) {
					return done(err);
				}

				UserModel.findOne({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				});
			})
	});

	it('should return validation errors if request is invalid', (done) => {
		request(app)
			.post('/users/post')
			.send({
				email: 'and',
				password: 'dsa'
			})
		  .expect(400)
		  .end(done)
	});

	it('should not create user if email in user', (done) => {
		var username = 'dasdsa';
		var password = 'dsdadasas!';
		request(app)
			.post('/users/post')
			.send({
				username,
				email: users[0].email,
				password
			})
			.expect(400)
			.end(done)
	});
});