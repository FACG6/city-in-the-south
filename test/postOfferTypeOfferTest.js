const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

test('Testing for post-offer-type route for new offer_type', (t) => {
  supertest(app)
    .post('/api/v1/offer-type')
    .set('Cookie', [Cookie])
    .send({
      name: 'part-time',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data[0].name, 'part-time', 'Success inserted');
        t.end();
      }
    });
});
