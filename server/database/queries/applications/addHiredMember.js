const connection = require('../../config/db_connection');

const addHiredMember = (memberId, offerId, status) => {
  const addMember = {
    text: 'INSERT INTO HIRED_MEMBER (MEMBER_ID, OFFER_ID, STATUS) VALUES ($1, $2, $3)',
    values: [memberId, offerId, status],
  };
  return connection.query(addMember);
};

module.exports = addHiredMember;
