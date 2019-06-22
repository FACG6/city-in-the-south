const test = require('tape');
const supertest = require('supertest');

const router = require('../server/app');
const { Cookie } = require('./testCookie');

test('Testing for /api/v1/offers/:offset route', (t) => {
  const fields = {
    id: 6,
    title: 'Small Shop seeks workers',
    position: 'Marketing Manager',
    description: 'We are looking to hire a Marketing Manager who will be in charge of overseeing the promotion of our companys brands.  As a successful hire, you will be  responsible  for developing pricing  strategies identify identifying new customers, supporting lead',
    status: 'active',
    member_id: 1,
    skills: [],
    offer_types: [],
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
