const dbconnection = require('../../config/db_connection.js');

const getMyOffer = memberId => dbconnection.query('SELECT * FROM offer WHERE offer.member_id = $1 ', [memberId]);
module.exports = { getMyOffer };
