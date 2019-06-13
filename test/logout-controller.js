const tape = require('tape');
const supertest = require('supertest');

const router = require('../server/app');
const { Cookie } = require('./testCookie');

tape('Testing for logout ', (t) => {
  supertest(router)
    .get('/api/v1/logout')
    .set('Cookie', [Cookie])
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      t.equal(res.body.data, 'success', 'return logout success');
      if (err) t.error(err);
      t.end();
    });
});
