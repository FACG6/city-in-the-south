const connection = require('../../config/db_connection');

const getOfferOfferType = (offerId) => {
  const sql = {
    text: `select offer_type.* from offer_offer_type
        inner join offer on offer_offer_type.offer_id=offer.id
        inner join offer_type on offer_offer_type.offer_type_id=offer_type.id
        where offer_offer_type.offer_id=$1`,
    values: [offerId],
  };
  return connection.query(sql);
};

module.exports = { getOfferOfferType };
