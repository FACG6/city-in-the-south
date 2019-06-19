const test = require('tape');
const supertest = require('supertest');
const app = require('../../server/app');
const { Cookie } = require('../testCookie');

test('Testing delete experience ', (t) => {
  supertest(app)
    .delete('/api/v1/experience/3')
    .set('Cookie', [Cookie])
    .expect(200)
    .send({ experienceId: 2 })
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(res.body.data, 'Deleted successfully ', 'Expected return the success msg');
      t.end();
    });
});
