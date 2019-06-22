const dbconnection = require('../../config/db_connection');

exports.postFilter = ({ memberId, skills, offerTypes }) => {
  const sql = {
    text: 'INSERT INTO filter(member_id, skills, offer_type) VALUES ($1, $2, $3) RETURNING *',
    values: [memberId, skills, offerTypes],
  };
  return dbconnection.query(sql);
};
