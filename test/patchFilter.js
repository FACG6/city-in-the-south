const test = require('tape');
const supertest = require('supertest');

const app = require('../server/app');
const { Cookie } = require('./testCookie');

test('patch filter test', (t) => {
  supertest(app)
    .patch('/api/v1/filter/2')
    .set('Cookie', [Cookie])
    .expect(200)
    .send({
      skills: [{ id: 1, name: 'javascript' }, { id: 10, name: 'Node js' }],
      offer_type: [{ id: 1, name: 'Full Time' }, { id: 10, name: 'Fixed price' }],
    })
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) {
        t.error(err);
      }
      t.equal(response.body.data.member_id, 2, 'return the same id');
      t.end();
    });
});
