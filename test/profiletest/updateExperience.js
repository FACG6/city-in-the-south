const test = require('tape');
const supertest = require('supertest');
const app = require('../../server/app');
const { Cookie } = require('../testCookie');

test('Testing For update Education ', (t) => {
  supertest(app)
    .put('/api/v1/experience/2')
    .set('Cookie', [Cookie])
    .expect(200)
    .send({
      id: 1,
      title: 'new exp',
      endDate: '05-05-2012',
      startDate: '05-05-2012',
      location: 'new location',
      description: 'new desc',
    })
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.body.data[0].title, 'new exp', 'Expected return the same title');
      t.end();
    });
});
