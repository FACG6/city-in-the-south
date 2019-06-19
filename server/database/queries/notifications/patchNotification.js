const connection = require('../../config/db_connection');

const patchNotification = (id) => {
  const sql = {
    text: 'update notification set seen=true where id=$1 returning *',
    values: [id],
  };
  return connection.query(sql);
};

module.exports = patchNotification;
