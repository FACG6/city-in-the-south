const db = require('../../config/db_connection.js');

const getSavedOffer = memberId => db.query(
  'SELECT  offer.id, offer.title , offer.description , offer.position, offer.status , saved_offer.member_id ,saved_offer.offer_id FROM offer RIGHT OUTER JOIN saved_offer ON saved_offer.offer_id = offer.id WHERE saved_offer.member_id = $1',
  [memberId],
);

const checkOffers = (memberId, offerId) => db.query(
  'SELECT  offer.id, offer.title , offer.description , offer.position, offer.status , saved_offer.member_id ,saved_offer.offer_id FROM offer RIGHT OUTER JOIN saved_offer ON saved_offer.offer_id = offer.id WHERE saved_offer.member_id = $1 AND  saved_offer.offer_id = $2',
  [memberId, offerId],
);

module.exports = { getSavedOffer, checkOffers };
