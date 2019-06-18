const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

test('testing for get offer id', (t) => {
  supertest(app)
    .get('/api/v1/offer/5')
    .set('Cookie', [Cookie])
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data.id, 5, 'the offer id must be 5');
        t.end();
      }
    });
});
