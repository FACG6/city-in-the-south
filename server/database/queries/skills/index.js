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

exports.getOfferSkills = (offerId) => {
  const sql = {
    text: `select skill.* from offer_skill
    inner join offer on offer_skill.offer_id=offer.id
    inner join skill on offer_skill.skill_id=skill.id
    where offer_skill.offer_id=$1`,
    values: [offerId],
  };
  return connection.query(sql);
};
