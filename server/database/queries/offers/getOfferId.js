const connection = require('../../config/db_connection');

const getOffer = offerId => connection.query('select * from offer where offer.id=$1', [offerId]);

module.exports = getOffer;
