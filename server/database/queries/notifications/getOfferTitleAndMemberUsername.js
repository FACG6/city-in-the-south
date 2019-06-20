const connection = require('../../config/db_connection');

const getOfferTitleAndMemberUsername = (memberId, offerId) => {
  const sql = {
    text: `select offer.title, offer.member_id as owner_id, member.username from application
    inner join offer on application.offer_id=offer.id 
    inner join member on application.member_id=member.id
    where application.offer_id=$1 and application.member_id=$2`,
    values: [offerId, memberId],
  };
  return connection.query(sql);
};

module.exports = getOfferTitleAndMemberUsername;
