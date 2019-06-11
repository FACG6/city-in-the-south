const test = require('tape');
const supertest = require('supertest');

const router = require('../server/app');
const connection = require('../server/database/config/db_connection');

const getOffers = () => connection.query(`select offer.* , COALESCE(json_agg(skill) filter (where skill.id is not null),'[]') as skills,
COALESCE(json_agg(offer_type) filter (where skill.id is not null),'[]') as offer_types from offer
left outer join offer_skill ON offer_skill.offer_id = offer.id
left outer JOIN skill ON skill.id = offer_skill.skill_id
left outer join offer_offer_type ON offer_offer_type.offer_id = offer.id
LEFT outer JOIN offer_type ON offer_type.id = offer_offer_type.offer_type_id
GROUP BY offer.id`);

test('Testing for /api/v1/offers/:offset route', (t) => {
  // const fields = ['id', 'title', 'position', 'description', 'status', 'member_id', 'skills', 'offer_types'];
  const fields = {
    id: 1,
    title: 'Ui Application For Website',
    position: 'Front End Developer',
    description: 'We are looking for a Front End Web Developer who is motivated to combine the art of UX design with the art of programming, and help bring to life elements and pages in terms of both how they look and how they function. The Front End developer will be embedded with the E-Commerce team and will serve as the go-to person responsible for translating mock-ups into website pages and functionality, with mobile-first, conversion optimization and user-centric designing in mind',
    status: 'active',
    member_id: 1,
    skills: [
      {
        id: 3,
        name: 'javascript',
      },
    ],
    offer_types: [
      {
        id: 1,
        name: 'full-time',
      },
    ],
  };
  getOffers()
    .then((result) => {
      supertest(router)
        .get('/api/v1/offers/100')
        .expect(200)
        .expect('content-type', /json/)
        .end((err, res) => {
          if (err) t.error(err);
          t.deepEqual(res.body.data[0], fields, 'Should contain the same fileds');
          t.end();
        });
    }).catch(err => t.error(err));
});

test.onFinish(() => {
  process.exit(0);
});
