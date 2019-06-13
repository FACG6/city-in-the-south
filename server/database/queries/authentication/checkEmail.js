const dbconnection = require('../../config/db_connection');

exports.checkEmail = (email) => {
  const sql = {
    text: 'SELECT * FROM member WHERE email = $1',
    values: [email],
  };
  return dbconnection.query(sql);
};
