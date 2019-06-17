const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

// getMyApplications
test('test getMyApplications', (t) => {
  supertest(app)
    .get('/api/v1/2/my-applications')
    .expect(200)
    .expect('content-type', /json/)
    .set('Cookie', [Cookie])
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
        ['id', 'title', 'position', 'description', 'status', 'member_id'],
        'data should be array of objects each object contains 6 keys',
      );
      t.end();
    });
});
