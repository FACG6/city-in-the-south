const test = require('tape');
const supertest = require('supertest');

const router = require('../server/app');
const { Cookie } = require('./testCookie');

test('Testing for /api/v1/offers/:offset route', (t) => {
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
  supertest(router)
    .get('/api/v1/offers/0')
    .expect(200)
    .expect('content-type', /json/)
    .set('Cookie', [Cookie])
    .end((err, res) => {
      if (err) t.error(err);
      t.deepEqual(res.body.data[0], fields, 'Should contain the same fileds');
      t.end();
    });
});
