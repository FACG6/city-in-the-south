const test = require('tape');
const supertest = require('supertest');

const router = require('../server/app');

test('Testing for /api/v1/skills route', (t) => {
  const fields = { id: 1, name: 'react.js' };
  supertest(router)
    .get('/api/v1/skills')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) t.error(err);
      t.deepEqual(res.body.data[0], fields, 'Should contain the same fileds');
      t.end();
    });
});

test.onFinish(() => {
  process.exit(0);
});
