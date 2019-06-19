const test = require('tape');
const supertest = require('supertest');

const router = require('../../server/app');
const { Cookie } = require('../testCookie');

test('Testing for /api/v1/member/', (t) => {
  supertest(router)
    .get('/api/v1/member/susan')
    .expect(200)
    .expect('content-type', /json/)
    .set('Cookie', [Cookie])
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.body.data[0].username, 'susan', 'Should return the same username');
      t.end();
    });
});
