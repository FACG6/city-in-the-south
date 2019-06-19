const test = require('tape');
const supertest = require('supertest');
const app = require('../../server/app');
const { Cookie } = require('../testCookie');

test('Testing For PATCH Username ', (t) => {
  supertest(app)
    .patch('/api/v1/member/username/3')
    .set('Cookie', [Cookie])
    .expect(200)
    .send({ username: 'Fatmasiam' })
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.body.data, 'Fatmasiam', 'Expected return the same bio');
      t.end();
    });
});
