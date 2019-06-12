const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');

test('Testing for login route "POST"', (t) => {
  supertest(app)
    .post('/api/v1/login')
    .send({
      username: 'ashatat',
      pass: '123456',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const actual = res.body.data;
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data, actual, ' Login success ');
        t.end();
      }
    });
});


test.onFinish(() => {
  process.exit(0);
});
