const expect = require('expect');
const request = require('supertest');

const { app } = require('../../server');
const { UserModel } = require('./../models/user.model');
const {users, populateUsers} = require('./seed/seed');

describe('POST users/login', () => {
	beforeEach(populateUsers);

	it('should login user and return auth token', (done) => {
		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: users[1].password
			})
			.expect(200)
			.expect((res) => {
				const header = res.headers['x-auth'];
				expect(header).toExist();
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				UserModel.findById(users[1]._id).then((user) => {
					expect(user.tokens[1]).toInclude({
						access: 'auth',
						token: res.headers['x-auth']
					});
					done();
				}).catch((e) => {
					done(e);
				});
			})
	});

	it('should reject invalid login', (done) => {
		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: 'dsadasd'
			})
			.expect(400)
			.expect((res) => {
				expect(res.headers['x-auth']).toNotExist();
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				UserModel.findById(users[1]._id).then((user) => {
					expect(user.tokens.length).toBe(1);
					done();
				}).catch((e) => done(e));
			});
	});
});