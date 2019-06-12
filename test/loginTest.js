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
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data,
          { id: 1, username: 'ashatat', avatar: 'https://avatars1.githubusercontent.com/u/18149438?s=460&v=4' },
          ' Login success ');
        t.end();
      }
    });
});


test.onFinish(() => {
  process.exit(0);
});
