const test = require('tape');
const supertest = require('supertest');
const app = require('../server/app');
const connection = require('../server/database/config/db_connection');

const selectOfferStatus = () => connection.query('select status from offer where id=5');

test('patch hired member test', (t) => {
  supertest(app)
    .patch('/api/v1/hired-member/2')
    .expect(200)
    .send({
      member_id: 2,
      offer_id: 5,
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
          data: [{ member_id: 2, offer_id: 5, status: 'accepted' }],
        },
        'hiredMember status is updated successfully',
      );
      t.end();
    });
});

test('test if offer status is changed to completed', (t) => {
  selectOfferStatus().then((result) => {
    t.equal(result.rows[0].status, 'completed', 'offer table status is updated successfully');
    t.end();
  });
});

test.onFinish(() => {
  process.exit(0);
});
