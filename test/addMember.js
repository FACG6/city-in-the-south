const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

test('Testing for add new member route', (t) => {
  supertest(app)
    .post('/api/v1/members')
    .send({
      username: 'Fatma98siam',
      email: 'fatma98@gmail.com',
      pass: '123456789',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .set('Cookie', [Cookie])
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data, [{ id: 5, username: 'Fatma98siam', avatar: null }], 'Return added Member');
        t.end();
      }
    });
});


test('Testing for add new member route "Failed "', (t) => {
  supertest(app)
    .post('/api/v1/members')
    .send({
      username: 'Fa',
      email: 'fatma98@gmail.com',
      pass: '123456',
    })
    .expect(400)
    .expect('Content-Type', /json/)
    .set('Cookie', [Cookie])
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.body.error.code, 400, 'check if the code 400');
        t.end();
      }
    });
});
