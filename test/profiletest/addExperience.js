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
      t.deepEqual(res.body.data, [{
        id: 3,
        title: 'exp title',
        end_date: '2012-05-04T21:00:00.000Z',
        start_date: '2012-12-01T22:00:00.000Z',
        location: 'location...',
        description: 'new description',
        member_id: 2,
      }], 'Expected return the added experience');
      t.end();
    });
});
