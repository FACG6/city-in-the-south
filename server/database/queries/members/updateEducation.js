const dbconnection = require('../../config/db_connection');

exports.updateEduction = (educationInfo, memberId) => {
  const {
    title, date, university, description,
  } = educationInfo;
  const sql = {
    text: 'UPDATE education SET title = 1$ , date = $2 ,university = $3,  description= $4 WHERE member_id = $5 RETURNING *',
    values: [title, date, university, description, memberId],
  };
  return dbconnection.query(sql);
};
