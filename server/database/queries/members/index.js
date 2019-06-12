const connection = require('../../config/db_connection');

exports.getMemberSkills = (id) => {
  const sql = {
    text: 'SELECT id, name FROM skill join member_skill on skill.id = member_skill.skill_id WHERE member_id = $1',
    values: [id],
  };
  return connection.query(sql);
};
