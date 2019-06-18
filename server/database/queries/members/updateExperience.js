const dbconnection = require('../../config/db_connection');

exports.updateExp = (educationInfo, memberId) => {
  const {
    title, date, university, description,
  } = educationInfo;
  const sql = {
    text: 'PDATE experience SET title = $1, end_date = $2, start_date= $3, location = $4,  description = $5 WHERE member_id = 3 RETURNING *',
    values: [title, date, university, description, memberId],
  };
  return dbconnection.query(sql);
};
