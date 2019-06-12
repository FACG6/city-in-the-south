const connection = require('../../config/db_connection');

const checkofferTypeName = (name) => {
  const sql = {
    text: 'select * from offer_type where name=$1',
    values: [name],
  };
  return connection.query(sql);
};
checkofferTypeName('ggg')
  .then(res => console.log(res.rowCount))
  .catch(err => console.log(err));
module.exports = { checkofferTypeName };
