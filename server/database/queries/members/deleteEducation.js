const dbconnection = require('../../config/db_connection');

exports.deleteEducation = (memberId, educationId) => {
  const sql = {
    text: 'DELETE FROM education WHERE member_id = $1 AND id = $2 RETURNING * ',
    values: [memberId, educationId],
  };
  return dbconnection.query(sql);
};
