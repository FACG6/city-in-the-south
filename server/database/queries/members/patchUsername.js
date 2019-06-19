const dbconnection = require('../../config/db_connection');

exports.patchUsername = (username, memberId) => {
  const sql = {
    text: 'UPDATE member SET username = $1 WHERE id= $2 RETURNING *',
    values: [username, memberId],
  };
  return dbconnection.query(sql);
};
