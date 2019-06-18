const test = require('tape');
const supertest = require('supertest');
const app = require('../../server/app');
const { Cookie } = require('../testCookie');

test('Testing add Education ', (t) => {
  const educationInfo = {
    title: 'New Education', date: '05-05-2012', university: 'University', description: 'desssss', memberId: 1,
  };
  supertest(app)
    .post('/api/v1/education')
    .set('Cookie', [Cookie])
    .expect(200)
    .send(educationInfo)
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.deepEqual(res.body.data, [{
        id: 3,
        title: 'New Education',
        date: '2012-05-04T21:00:00.000Z',
        university: 'University',
        description: 'desssss',
        member_id: 1,
      }], 'Expected return the added education');
      t.end();
    });
});
