const dbconnection = require('../../config/db_connection.js');

const getOfferType = () => {
  const selectOfferType = {
    text: 'select offer_type.id,offer_type.name from offer_type',

  };
  return dbconnection.query(selectOfferType);
};
module.exports = { getOfferType };
