const connection = require('../../config/db_connection');

const checkofferTypeName = (name) => {
  const sql = {
    text: 'select * from offer_type where name=$1',
    values: [name],
  };
  return connection.query(sql);
};
module.exports = checkofferTypeName;
