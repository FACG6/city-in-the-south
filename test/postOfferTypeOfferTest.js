const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');

test('Testing for post-offer-type route', (t) => {
  supertest(app)
    .post('/api/v1/offer-type')
    .send({
      name: 'full-time',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        console.log(res);

        // t.deepEqual(res.body.data, );
        // t.end();
      }
    });
});


test.onFinish(() => {
  process.exit(0);
});
