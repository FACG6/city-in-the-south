const dbconnection = require('../../config/db_connection');

exports.addEducation = (educationInfo) => {
  const {
    title, date, university, description, memberId,
  } = educationInfo;
  const sql = {
    text: 'INSERT INTO education(title, date , university, description , member_id) VALUES($1, $2, $3 ,$4,$5) RETURNING * ',
    values: [title, date, university, description, memberId],
  };
  return dbconnection.query(sql);
};
