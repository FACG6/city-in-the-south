const dbconnection = require('../../config/db_connection');

const checkUsername = (username) => {
  const sql = {
    text: 'SELECT * FROM member WHERE username = $1',
    values: [username],
  };
  return dbconnection.query(sql);
};

module.exports = { checkUsername };
