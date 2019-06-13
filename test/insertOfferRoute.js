const test = require('tape');
const supertest = require('supertest');

const router = require('../server/app');
const { Cookie } = require('./testCookie');

test('Testing /api/v1/offers route with method POST', (t) => {
  const body = {
    title: 'Ui application for website',
    position: 'front end developer',
    description: 'lorem ipsum',
    skills: [{ id: 1, name: 'javascript' },
      { id: 2, name: 'Node js' },
      { id: 3, name: 'Express' },
    ],
    offer_types: [
      { id: 1, name: 'Full Time' },
      { id: 2, name: 'Fixed price' },
    ],
    member_id: 1,
  };
  supertest(router)
    .post('/api/v1/offers')
    .send(body)
    .set('Cookie', [Cookie])
    .expect(200)
    .end((err, result) => {
      if (err) {
        t.error(err);
        t.end();
      }
      t.equal(result.body.data.title, 'Ui application for website', 'Should contain the same content');
      t.end();
    });
});
