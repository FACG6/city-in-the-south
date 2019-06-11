const dbConnection = require('../../config/db_connection.js');

const addOfferType = (Name) => {
  const sql = {
    text: 'INSERT INTO offer_type (name) VALUES $1 RETURNING *',
    VALUES: [Name],
  };
  return dbConnection.query(sql);
};
module.exports = { addOfferType };
