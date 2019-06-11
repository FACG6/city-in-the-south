const tape = require('tape');
const supertest = require('supertest');

const connection = require('../server/database/config/db_connection');
const router = require('../server/app');

const insertOffer = () => connection.query('INSERT INTO offer(title, position, member_id) VALUES (\'small shop\', \'accountant\', 2)');

const selectOffer = () => connection.query('SELECT * FROM offer LIMIT 1');

tape('Testing for DELETE : /api/v1/offers/:offerId', (t) => {
  insertOffer();
  let offerId;
  selectOffer()
    .then((res) => {
      offerId = res.rows[0].id;
      supertest(router)
        .delete(`/api/v1/offers/${offerId}`)
        .expect(200)
        .expect('content-type', /json/)
        .end((err, response) => {
          if (err) t.error(err);
          t.equal(response.body.data, 'success', 'Should return sucess message');
          t.end();
        });
    })
    .catch(err => console.log(err));
});

tape.onFinish(() => {
  process.exit(0);
});
