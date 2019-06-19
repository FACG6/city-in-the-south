const connection = require('../../config/db_connection');

const getNotifications = (member_id) => {
  const sql = {
    text: 'select * from notification where member_id=$1',
    values: [member_id],
  };
  return connection.query(sql);
};

module.exports = getNotifications;
