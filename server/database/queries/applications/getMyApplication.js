const connection = require('../../config/db_connection');

const getMyApplication = (memberId, offerId) => {
  const selectMyApplications = {
    text: `select application.member_id,member.username as username, member.full_name as full_name, member.avatar as avatar, application.proposal, hired_member.status from application
      left outer join member on application.member_id= member.id
      left outer join hired_member on (application.member_id=hired_member.member_id and application.offer_id=hired_member.offer_id) 
      where (application.member_id=$1 and application.offer_id=$2);`,
    values: [memberId, offerId],
  };
  return connection.query(selectMyApplications);
};

module.exports = getMyApplication;
