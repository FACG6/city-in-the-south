const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

test('add new Application test', (t) => {
  supertest(app)
    .post('/api/v1/applications')
    .set('Cookie', [Cookie])
    .expect(200)
    .send({
      member_id: 1,
      offer_id: 2,
      proposal: 'this is test proposal',
    })
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) {
        t.error(err);
      }
      t.deepEqual(
        response.body,
        {
          error: null,
          data: [{ member_id: 1, offer_id: 2, proposal: 'this is test proposal' }],
        },
        'New Application is added successfully',
      );
      t.end();
    });
});
