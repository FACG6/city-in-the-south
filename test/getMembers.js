const test = require('tape');
const supertest = require('supertest');

const router = require('../server/app');

test('Testing for /api/v1/members/:offset route', (t) => {
  const fields = {
    id: 2,
    username: 'susan',
    full_name: 'susan flynn',
    email: 'test@test.com',
    pass: '$2y$12$YHVYRLuVyRWHDQNj8tylaeRa64rl3Lr0GcAOyy3/14kATxvKQCWcG',
    bio: 'Department Chair, Applied Behavior Analysis Online Program at The Chicago School of Professional Psychology',
    address: 'Pawleys Island, South Carolina',
    phone: '+00000000000',
    avatar: 'https://media.licdn.com/dms/image/C4E03AQHYhdkypt7-NQ/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=F_cWllIFb3MNTCwQoaqOpu4bbB5KnT7ZshgzuOaycFM',
    profession_id: 9,
    skills: [{ id: 2, name: 'java' }, { id: 3, name: 'javascript' }],
  };
  supertest(router)
    .get('/api/v1/members/0')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) t.error(err);
      t.deepEqual(res.body.data[0], fields, 'Should contain the same fileds');
      t.end();
    });
});

test.onFinish(() => {
  process.exit(0);
});
