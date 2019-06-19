const dbconnection = require('../../config/db_connection');

exports.patchBio = (bio, memberId) => {
  const sql = {
    text: 'UPDATE member SET bio  = $1 WHERE id= $2 RETURNING *',
    values: [bio, memberId],
  };
  return dbconnection.query(sql);
};
