const db = require('../../config/db_connection.js');

const getSavedOffer = memberId => db.query('SELECT offer.title , offer.description , offer.position , saved_offer.member_id ,saved_offer.offer_id FROM offer RIGHT OUTER JOIN saved_offer ON saved_offer.offer_id = offer.id WHERE saved_offer.member_id = $1', [memberId]);
module.exports = { getSavedOffer };
