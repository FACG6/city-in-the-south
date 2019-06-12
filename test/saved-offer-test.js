const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

test('Testing for saved-offers route', (t) => {
  supertest(app)
    .post('/api/v1/saved-offers')
    .send({
      memberId: 1,
      offerId: 2,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .set('Cookie', [Cookie])
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data, [{ member_id: 1, offer_id: 2 }], 'Return Saved offer Data');
        t.end();
      }
    });
});


test.onFinish(() => {
  process.exit(0);
});
