const test = require('tape');
const supertest = require('supertest');
const app = require('../../server/app');
const { Cookie } = require('../testCookie');

test('Testing For PATCH bio ', (t) => {
  supertest(app)
    .patch('/api/v1/member/bio/3')
    .set('Cookie', [Cookie])
    .expect(200)
    .send({ bio: 'new bio' })
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.body.data, 'new bio', 'Expected return the same bio');
      t.end();
    });
});
