const dbconnection = require('../../config/db_connection');

exports.getMemberEXp = (memberId) => {
  const sql = {
    text: 'SELECT * FROM experience WHERE member_id = $1',
    values: [memberId],
  };
  return dbconnection.query(sql);
};
