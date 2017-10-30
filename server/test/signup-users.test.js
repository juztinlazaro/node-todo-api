const expect = require('expect');
const request = require('supertest');

const { app } = require('../../server');
const { UserModel } = require('./../models/user.model');
const {users, populateUsers} = require('./seed/seed');

describe('GET user/me', () => {
	beforeEach(populateUsers);
	it('should return user if authenticated', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			// .expect(200)
			.expect((res) => {
				console.log('users', users[0].tokens[0].token);
				console.log('res', res.body);
				// expect(res.body._id).toBe(users[0]._id.toHexString());
				// expect(res.body.email).toBe(user[0].email.toHexString());
			})
			.end(done);
	});

	it('should return 401 if not authenticated', (done) => {

	});
});	