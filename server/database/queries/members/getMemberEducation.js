const dbconnection = require('../../config/db_connection');

exports.getMemberEduction = (memberId) => {
  const sql = {
    text: 'SELECT * FROM education WHERE member_id = $1',
    values: [memberId],
  };
  return dbconnection.query(sql);
};
