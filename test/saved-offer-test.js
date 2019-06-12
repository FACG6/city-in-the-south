const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');

test('Testing for saved-offers route', (t) => {
  supertest(app)
    .post('/api/v1/saved-offers')
    .send({
      memberId: 1,
      offerId: 2,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhc2hhdGF0IiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzMS5naXRodWJ1c2VyY29udGVudC5jb20vdS8xODE0OTQzOD9zPTQ2MCZ2PTQiLCJpYXQiOjE1NjAzMjQwMzd9.zHBY7N7vfbcNiybjvJkgZY-auGUGlUEJeq4JTUlnA50'])
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data, [{ member_id: 1, offer_id: 2 }], 'Return Saved offer Data');
        t.end();
      }
    });
});


test.onFinish(() => {
  process.exit(0);
});
