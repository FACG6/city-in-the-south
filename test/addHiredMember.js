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
