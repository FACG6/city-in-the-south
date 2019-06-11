const connection = require('../../config/db_connection');

const getMyApplications = (memberId) => {
  const selectMyApplications = {
    text: `select application.member_id,application.offer_id  as offer_id, member.username as username, member.full_name as full_name, member.avatar as avatar, application.proposal, hired_member.status from application
      left outer join member on application.member_id= member.id
      left outer join hired_member on (application.member_id=hired_member.member_id and application.offer_id=hired_member.offer_id) 
      where (application.member_id=$1);`,
    values: [memberId],
  };
  return connection.query(selectMyApplications);
};

module.exports = getMyApplications;
