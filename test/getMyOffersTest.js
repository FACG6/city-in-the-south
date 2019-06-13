const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

test('testing for get-my-offers', (t) => {
  supertest(app)
    .get('/api/v1/my-offers/2')
    .expect(200)
    .expect('Content-Type', /json/)
    .set('Cookie', [Cookie])
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data[0].status, 'finished', 'is true status ');
        t.end();
      }
    });
});
