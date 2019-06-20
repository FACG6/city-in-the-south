const dbconnection = require('../../config/db_connection');

exports.postFilter = (memberId) => {
  const sql = {
    text: 'INSERT INTO filter(member_id) VALUES ($1) RETURNING *',
    values: [memberId],
  };
  return dbconnection.query(sql);
};
