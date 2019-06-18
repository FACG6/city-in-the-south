const dbconnection = require('../../config/db_connection');

exports.updateExperience = (expInfo, memberId) => {
  const {
    title, endDate, startDate, location, description, id,
  } = expInfo;
  const sql = {
    text: 'UPDATE experience SET title = $1, end_date = $2, start_date= $3, location = $4, description = $5 WHERE member_id = $6 AND id = $7 RETURNING *',
    values: [title, endDate, startDate, location, description, memberId, id],
  };
  return dbconnection.query(sql);
};
