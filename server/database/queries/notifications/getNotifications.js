const connection = require('../../config/db_connection');

const getNotifications = (memberId) => {
  const sql = {
    text: 'select * from notification where member_id=$1',
    values: [memberId],
  };
  return connection.query(sql);
};

module.exports = getNotifications;
