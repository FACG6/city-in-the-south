const test = require('tape');
const supertest = require('supertest');

const router = require('../../server/app');
const { Cookie } = require('../testCookie');

test('Testing for get experience', (t) => {
  supertest(router)
    .get('/api/v1/experience/2')
    .expect(200)
    .expect('content-type', /json/)
    .set('Cookie', [Cookie])
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.body.data[0].title, 'Assistant Director', 'Should return the same title');
      t.end();
    });
});
