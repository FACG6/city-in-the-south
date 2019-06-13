const dbConnection = require('../../config/db_connection.js');

const addOfferType = (name) => {
  const sql = {
    text: 'INSERT INTO offer_type (name) VALUES ($1) RETURNING *',
    values: [name],
  };
  return dbConnection.query(sql);
};
module.exports = addOfferType;
