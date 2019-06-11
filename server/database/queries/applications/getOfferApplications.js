const connection = require('../../config/db_connection');

const getOfferApplications = (offerId) => {
  const selectOfferApplications = {
    text: `select
    application.member_id, member.username as username, member.full_name as full_name, member.avatar as avatar, application.proposal, hired_member.status
    from application
    left outer join member on application.member_id= member.id
    left outer join hired_member on (application.member_id=hired_member.member_id and application.offer_id=hired_member.offer_id)
    where (application.offer_id=$1)`,
    values: [offerId],
  };
  return connection.query(selectOfferApplications);
};

module.exports = getOfferApplications;
