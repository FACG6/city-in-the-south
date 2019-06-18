const dbconnection = require('../../config/db_connection');

exports.updateExp = (educationInfo, memberId) => {
  const {
    title, date, university, description, id,
  } = educationInfo;
  const sql = {
    text: 'PDATE experience SET title = $1, end_date = $2, start_date= $3, location = $4,  description = $5 WHERE member_id = $6 AND id = $7 RETURNING *',
    values: [title, date, university, description, memberId, id],
  };
  return dbconnection.query(sql);
};
