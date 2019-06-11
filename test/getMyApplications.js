const test = require('tape');
const supertest = require('supertest');
const app = require('../server/app');

// getMyApplications
test('test getMyApplications', (t) => {
  supertest(app)
    .get('/api/v1/2/my-applications')
    .expect(200)
    .expect('content-type', /json/)
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
        ['member_id', 'offer_id', 'username', 'full_name', 'avatar', 'proposal', 'status'],
        'data should be array of objects each object contains 6 keys',
      );
      t.end();
    });
});
