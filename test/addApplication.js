const test = require('tape');
const supertest = require('supertest');
const app = require('../server/app');

test('add new Application test', (t) => {
  supertest(app)
    .post('/api/v1/applications')
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

test.onFinish(() => {
  process.exit(0);
});
