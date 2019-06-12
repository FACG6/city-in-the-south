const tape = require('tape');
const supertest = require('supertest');

const connection = require('../server/database/config/db_connection');
const router = require('../server/app');

const insertMember = () => connection.query('INSERT INTO member(username, full_name) VALUES (\'maiseSoph\', \'maiseee Soph\') RETURNING *');

const insertSkill = () => connection.query('INSERT INTO skill (name) VALUES (\'python\'), (\'sql\'), (\'javafx\')');

const insertMemberSkills = id => connection.query('INSERT INTO member_skill (member_id, skill_id) VALUES ($1, 1), ($1, 2) RETURNING *', [id]);

tape('Testing for route', (t) => {
  let memberId;
  const fields = ['id', 'name'];
  insertSkill();
  insertMemberSkills();
  insertMember().then(res => insertMemberSkills(res.rows[0].id))
    .then((res) => {
      memberId = res.rows[0].member_id;
    })
    .then(() => {
      supertest(router)
        .get(`/api/v1/skills/${memberId}`)
        .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhc2hhdGF0IiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzMS5naXRodWJ1c2VyY29udGVudC5jb20vdS8xODE0OTQzOD9zPTQ2MCZ2PTQiLCJpYXQiOjE1NjAzMjQwMzd9.zHBY7N7vfbcNiybjvJkgZY-auGUGlUEJeq4JTUlnA50'])
        .expect(200)
        .expect('content-type', /json/)
        .end((err, response) => {
          if (err) t.error(err);
          t.deepEqual(Object.keys(response.body.data[0]), fields, 'Should contain the same fileds');
          t.end();
        });
    })
    .catch(err => t.error(err));
});

tape.onFinish(() => {
  process.exit(0);
});
