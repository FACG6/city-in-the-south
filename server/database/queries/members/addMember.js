const dbconnection = require('../../config/db_connection');

const addMmeber = (memberInfo) => {
  const queryValues = Object.values(memberInfo);
  const sql = {
    text: 'INSERT INTO member(username,pass, email) VALUES ( $1, $2, $3 ) RETURNING *',
    values: [...queryValues],
  };
  return dbconnection.query(sql);
};

module.exports = { addMmeber };
