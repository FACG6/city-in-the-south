const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

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
    .set('Cookie', [Cookie])
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
