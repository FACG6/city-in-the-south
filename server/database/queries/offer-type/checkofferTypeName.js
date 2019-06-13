const connection = require('../../config/db_connection');

const checkofferTypeName = (name) => {
  const sql = {
    text: 'select * from offer_type where name=$1',
    values: [name],
  };
  return connection.query(sql);
};
// checkofferTypeName('full-time')
//   .then(res => console.log(res.rows))// num--> so dont add(offer_type already exist)
//   .catch(err => console.log(err));
// checkofferTypeName('bbbbb')
//   .then(res => console.log(res.rows))// empty--> so add it
//   .catch(err => console.log(err));
module.exports = { checkofferTypeName };
