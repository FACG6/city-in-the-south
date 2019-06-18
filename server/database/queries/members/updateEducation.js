const dbconnection = require('../../config/db_connection');

exports.updateEduction = (educationInfo, memberId) => {
  const {
    title, date, university, description, id,
  } = educationInfo;
  const sql = {
    text: 'UPDATE education SET title = 1$ , date = $2 ,university = $3,  description= $4 WHERE member_id = $5 AND id = $6 RETURNING *',
    values: [title, date, university, description, memberId, id],
  };
  return dbconnection.query(sql);
};
