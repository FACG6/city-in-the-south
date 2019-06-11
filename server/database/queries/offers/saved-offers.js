const dbconnection = require('../../config/db_connection');

const addSavedOffers = (savedOfferInfo) => {
  const { memberId, offerId } = savedOfferInfo;
  const sql = {
    text: ' INSERT INTO saved_offer(member_id, offet_id) VALUES ($1, $2) RETURNING *',
    values: [memberId, offerId],
  };
  return dbconnection.query(sql);
};

module.exports = { addSavedOffers };
