const test = require('tape');
const supertest = require('supertest');
const app = require('../server/app');

test('add hired member test', (t) => {
  supertest(app)
    .post('/api/v1/hired-member')
    .expect(200)
    .send({
      member_id: 1,
      offer_id: 1,
      status: 'accepted',
    })
    .expect('content-type', /json/)
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhc2hhdGF0IiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzMS5naXRodWJ1c2VyY29udGVudC5jb20vdS8xODE0OTQzOD9zPTQ2MCZ2PTQiLCJpYXQiOjE1NjAzMjQwMzd9.zHBY7N7vfbcNiybjvJkgZY-auGUGlUEJeq4JTUlnA50'])
    .end((err, response) => {
      if (err) {
        t.error(err);
      }
      t.deepEqual(
        response.body,
        {
          error: null,
          data: [{ member_id: 1, offer_id: 1, status: 'accepted' }],
        },
        'hiredMember is added successfully',
      );
      t.end();
    });
});

test.onFinish(() => {
  process.exit(0);
});
