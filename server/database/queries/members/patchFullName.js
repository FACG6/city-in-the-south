const dbconnection = require('../../config/db_connection');

exports.patchFullName = (fullName, memberId) => {
  const sql = {
    text: 'UPDATE member SET full_name = $1 WHERE id= $2 RETURNING *',
    values: [fullName, memberId],
  };
  return dbconnection.query(sql);
};
