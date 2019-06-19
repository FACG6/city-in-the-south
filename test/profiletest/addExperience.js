const test = require('tape');
const supertest = require('supertest');
const app = require('../../server/app');
const { Cookie } = require('../testCookie');

test('Testing add Exp ', (t) => {
  const experienceInfo = {
    title: 'exp title',
    endDate: '05-05-2012',
    startDate: '12-02-2012',
    location: 'location...',
    description: 'new description',
    memberId: 2,
  };
  supertest(app)
    .post('/api/v1/experience')
    .set('Cookie', [Cookie])
    .expect(200)
    .send(experienceInfo)
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.body.data[0].title, 'exp title', 'Expected return the added experience');
      t.end();
    });
});
