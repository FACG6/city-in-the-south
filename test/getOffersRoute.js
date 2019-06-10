const test = require('tape');
const supertest = require('supertest');

const router = require('../server/app');
const connection = require('../server/database/config/db_connection');

const getOffers = () => connection.query('select offer.*, (select json_agg(skill) from(select * from skill) as skill) as skills, (select json_agg(offer_type) from(select * from offer_type) as offer_type) as offer_types from offer left outer join offer_skill ON offer_skill.offer_id = offer.id left JOIN skill ON skill.id = offer_skill.skill_id left join offer_offer_type ON offer_offer_type.offer_id = offer.id LEFT JOIN offer_type ON offer_type.id = offer_offer_type.offer_type_id GROUP BY offer.id');

test('Testing for /api/v1/offers/:offset route', (t) => {
  const fields = ['id', 'title', 'position', 'description', 'status', 'member_id', 'skills', 'offer_types'];
  getOffers()
    .then((result) => {
      supertest(router)
        .get('/api/v1/offers/100')
        .expect(200)
        .expect('content-type', /json/)
        .end((err, res) => {
          if (err) t.error(err);
          t.deepEqual(Object.keys(res.body.data[0]), fields, 'Should contain the same fileds');
          t.end();
        });
    }).catch(err => t.error(err));
});

test.onFinish(() => {
  process.exit(0);
});
