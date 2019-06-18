const connection = require('../../config/db_connection');

const getMyApplications = (memberId) => {
  const selectMyApplications = {
    text: `select offer.* from application
      left outer join offer on application.offer_id = offer.id
      left outer join member on application.member_id= member.id
      where (application.member_id=$1);`,
    values: [memberId],
  };
  return connection.query(selectMyApplications);
};

module.exports = getMyApplications;
