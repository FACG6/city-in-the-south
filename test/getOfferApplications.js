const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

test('test getOfferApplications', (t) => {
  supertest(app)
    .get('/api/v1//offer-applications/1')
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
        'Should return object of two keys (error and data)',
      );
      t.deepEqual(
        Object.keys(response.body.data[0]),
        ['member_id', 'username', 'full_name', 'avatar', 'proposal', 'status'],
        'data should be array of objects each object contains 6 keys',
      );
      t.end();
    });
});
