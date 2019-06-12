const test = require('tape');
const supertest = require('supertest');
const app = require('../server/app');

test('testing for get offer id', (t) => {
  supertest(app)
    .get('/api/v1/offer/5')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data[0].id, 5, 'the offer id must be 5');
        t.end();
      }
    });
});
test.onFinish(() => {
  process.exit(0);
});
