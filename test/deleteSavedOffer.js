const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

test('Testing for delete saved-offers route', (t) => {
  supertest(app)
    .delete('/api/v1/saved-offers/1')
    .set('Cookie', [Cookie])
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
