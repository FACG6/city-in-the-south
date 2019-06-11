const test = require('tape');
const supertest = require('supertest');
const app = require('../server/app');

test('testing for get-my-offers', (t) => {
  supertest(app)
    .get('/api/v1/offer-type')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data[0].name, 'full-time', 'is true name offer-type ');
        t.end();
      }
    });
});
test.onFinish(() => {
  process.exit(0);
});
