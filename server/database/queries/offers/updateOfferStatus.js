const connection = require('../../config/db_connection');

const updateOfferStatus = (offerId, status) => {
  const updateStatus = {
    text: 'UPDATE OFFER SET STATUS=$2 WHERE (ID=$1) RETURNING *',
    values: [offerId, status],
  };
  return connection.query(updateStatus);
};

module.exports = updateOfferStatus;
