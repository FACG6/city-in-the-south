const connection = require('../../config/db_connection');

exports.getSkills = () => connection.query('SELECT * FROM skill');
exports.checkSkills = (name) => {
  const sql = {
    text: 'select * from skill where skill.name = $1',
    values: [name],
  };
  return connection.query(sql);
};

exports.insertSkills = (name) => {
  const sql = {
    text: 'INSERT INTO skill(name) values ($1) RETURNING *',
    values: [name],
  };
  return connection.query(sql);
};
