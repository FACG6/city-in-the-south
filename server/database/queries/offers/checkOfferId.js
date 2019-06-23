const dbconnection = require('../../config/db_connection.js');

const checkOffer = offerId => dbconnection.query('SELECT * FROM offer WHERE offer.id = $1 ', [offerId]);
module.exports = { checkOffer };
