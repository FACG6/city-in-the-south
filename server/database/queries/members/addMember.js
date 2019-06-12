const dbconnection = require('../../config/db_connection');

const addMmeber = (memberInfo) => {
  const queryValues = Object.values(memberInfo);
  const sql = {
    text: 'INSERT INTO member(username,email, pass, avatar) VALUES ( $1, $2, $3, $4 ) RETURNING *',
    values: [...queryValues, 'https://png.pngtree.com/svg/20161027/631929649c.svg'],
  };
  return dbconnection.query(sql);
};

module.exports = { addMmeber };
