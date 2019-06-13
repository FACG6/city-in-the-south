const test = require('tape');
const supertest = require('supertest');

const router = require('../server/app');
const { Cookie } = require('./testCookie');

test('Testing for /api/v1/filter/:memberId route', (t) => {
  supertest(router)
    .get('/api/v1/filter/2')
    .expect(200)
    .expect('content-type', /json/)
    .set('Cookie', [Cookie])
    .end((err, res) => {
      if (err) t.error(err);
      const { skills } = res.body.data;
      t.equal(skills[0].id, 3, 'Should contain the same skill id');
      t.equal(skills[0].name, 'javascript', 'Should contain the same skill name');
      t.end();
    });
});
