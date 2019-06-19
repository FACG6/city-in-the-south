const dbconnection = require('../../config/db_connection');


exports.addExperience = (educationInfo) => {
  const {
    title, endDate, startDate, location, description, memberId,
  } = educationInfo;
  const sql = {
    text: 'INSERT INTO experience(title, end_date, start_date, location, description, member_id) VALUES ($1, $2, $3 ,$4, $5, $6) RETURNING *',
    values: [title, endDate, startDate, location, description, memberId],
  };
  return dbconnection.query(sql);
};
