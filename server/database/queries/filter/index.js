const connection = require('../../config/db_connection');

exports.getFilterData = (memberId) => {
  const sql = {
    text: 'SELECT * FROM filter WHERE member_id = $1',
    values: [memberId],
  };
  return connection.query(sql);
};
