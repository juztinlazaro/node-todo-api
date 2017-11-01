const expect = require('expect');
const request = require('supertest');

const { app } = require('../../server');
const { UserModel } = require('./../models/user.model');
const {users, populateUsers} = require('./seed/seed');

describe('LOGOU users/me/token', () => {
	beforeEach(populateUsers);

	it('should be remove', (done) => {
		request(app)
			.delete('/users/me/token')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.end((err, res) => {
				if(err) {
					return done(err);
				}
				UserModel.findById(users[1]._id).then((user) => {
					expect(user.tokens.length).toBe(0);
					done();
				}).catch((e) => done(e));
			});
	});
});