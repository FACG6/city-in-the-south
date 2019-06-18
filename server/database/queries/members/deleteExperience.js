const dbconnection = require('../../config/db_connection');

exports.deleteExperience = (memberId) => {
  const sql = {
    text: 'DELETE FROM experience WHERE member_id = $1 RETURNING * ',
    values: [memberId],
  };
  return dbconnection.query(sql);
};
