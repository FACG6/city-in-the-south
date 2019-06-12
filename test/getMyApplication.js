const test = require('tape');
const supertest = require('supertest');
const app = require('../server/app');

// getMyApplication for specific offerId
test('test getMyApplication', (t) => {
  supertest(app)
    .get('/api/v1/2/my-applications/1')
    .expect(200)
    .expect('content-type', /json/)
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhc2hhdGF0IiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzMS5naXRodWJ1c2VyY29udGVudC5jb20vdS8xODE0OTQzOD9zPTQ2MCZ2PTQiLCJpYXQiOjE1NjAzMjQwMzd9.zHBY7N7vfbcNiybjvJkgZY-auGUGlUEJeq4JTUlnA50'])
    .end((err, response) => {
      if (err) {
        t.error(err);
      }
      t.deepEqual(
        Object.keys(response.body),
        ['error', 'data'],
        'Should object of two keys (error and data)',
      );
      t.deepEqual(
        Object.keys(response.body.data[0]),
        ['member_id', 'username', 'full_name', 'avatar', 'proposal', 'status'],
        'Should object of 6 keys',
      );
      t.end();
    });
});

test.onFinish(() => {
  process.exit(0);
});
