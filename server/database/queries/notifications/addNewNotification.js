const connection = require('../../config/db_connection');

const addNewNotification = ({
  title, msg, url, seen, tag, member_id,
}) => {
  const sql = {
    text:
      'insert into notification (title, msg, url, seen, tag, member_id) values ($1,$2,$3,$4,$5,$6) returning *',
    values: [title, msg, url, seen, tag, member_id],
  };
  return connection.query(sql);
};

module.exports = addNewNotification;
