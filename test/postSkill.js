const test = require('tape');
const supertest = require('supertest');

const router = require('../server/app');
const { Cookie } = require('./testCookie');

test('Testing /api/v1/skills  route', (t) => {
  const body = {
    name: 'JAVAFX',
  };

  supertest(router)
    .post('/api/v1/skills')
    .send(body)
    .set('Cookie', [Cookie])
    .expect(200)
    .end((err, result) => {
      if (err) {
        t.error(err);
        t.end();
      }
      t.deepEqual(result.body.data.name, 'JAVAFX', 'Should contain the same content');
      t.end();
    });
});
