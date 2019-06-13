const dbconnection = require('../../config/db_connection');

const deleteSavedOffer = (savedOfferInfo) => {
  const { memberId, offerId } = savedOfferInfo;
  const sql = {
    text: 'DELETE FROM saved_offer WHERE member_id = $1 AND offer_id = $2 RETURNING *',
    values: [memberId, offerId],
  };
  return dbconnection.query(sql);
};

module.exports = { deleteSavedOffer };
