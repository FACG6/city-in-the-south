const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');

test('Testing for add new member route', (t) => {
  supertest(app)
    .post('/api/v1/members')
    .send({
      username: 'Fatma98siam',
      email: 'fatma98@gmail.com',
      pass: '123456789',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data, [{ id: 5, username: 'Fatma98siam', avatar: 'https://png.pngtree.com/svg/20161027/631929649c.svg' }], 'Return added Member');
        t.end();
      }
    });
});

test.onFinish(() => {
  process.exit(0);
});
