const tape = require('tape');
const supertest = require('supertest');

const connection = require('../server/database/config/db_connection');
const router = require('../server/app');
const { Cookie } = require('./testCookie');

const insertOffer = () => connection.query('INSERT INTO offer(title, position, member_id) VALUES (\'small shop\', \'accountant\', 2)');

const selectOffer = () => connection.query('SELECT * FROM offer LIMIT 1');

const selectDeletedOffer = id => connection.query('SELECT * FROM offer WHERE offer.id = $1', [id]);

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
        .set('Cookie', [Cookie])
        .end((err) => {
          if (err) t.error(err);
          selectDeletedOffer(offerId)
            .then((result) => {
              t.equal(result.rowCount, 0, 'Should return empty array');
              t.end();
            })
            .catch(error => t.error(error));
        });
    })
    .catch(error => t.error(error));
});
