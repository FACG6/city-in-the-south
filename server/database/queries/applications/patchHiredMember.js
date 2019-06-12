const connection = require('../../config/db_connection');

const patchHiredMember = (memberId, offerId, status) => {
  const patchHired = {
    text: 'UPDATE HIRED_MEMBER SET STATUS=$3 WHERE (MEMBER_ID=$1 AND OFFER_ID=$2) RETURNING *',
    values: [memberId, offerId, status],
  };
  return connection.query(patchHired);
};

module.exports = patchHiredMember;
