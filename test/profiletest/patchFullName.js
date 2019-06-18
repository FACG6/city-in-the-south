const test = require('tape');
const supertest = require('supertest');
const app = require('../../server/app');
const { Cookie } = require('../testCookie');

test('Testing For PATCH full name ', (t) => {
  supertest(app)
    .patch('/api/v1/member/fullname/3')
    .set('Cookie', [Cookie])
    .expect(200)
    .send({ fullname: 'Fatmasiam' })
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.body.data, 'Fatmasiam', 'Expected return the full name');
      t.end();
    });
});
