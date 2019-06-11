const test = require('tape');
const supertest = require('supertest');
const app = require('../server/app');

test('testing for get-saved-offers ', (t) => {
  supertest(app)
    .get('/api/v1/saved-offers/2')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.deepEqual(res.body.data[0].title, 'Small Shop seeks workers', 'is true title ');
        t.end();
      }
    });
});
test.onFinish(() => {
  process.exit(0);
});
