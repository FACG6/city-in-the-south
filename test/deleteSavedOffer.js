const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');

test('Testing for delete saved-offers route', (t) => {
  supertest(app)
    .delete('/api/v1/saved-offers/1')
    .send({
      offerId: 2,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data, 'success', 'Return success msg ');
        t.end();
      }
    });
});


test.onFinish(() => {
  process.exit(0);
});
