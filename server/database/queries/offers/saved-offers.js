const dbconnection = require('../../config/db_connection');

const addSavedOffers = (savedOfferInfo) => {
  const queryValues = Object.values(savedOfferInfo);
  const sql = {
    text: ' INSERT INTO saved_offer(member_id, offet_id) VALUES ($1, $2) RETURNING *',
    values: [...queryValues],
  };
  return dbconnection.query(sql);
};

module.exports = { addSavedOffers };
