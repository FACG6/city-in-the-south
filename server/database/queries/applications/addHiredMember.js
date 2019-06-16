const connection = require('../../config/db_connection');

const addHiredMember = (memberId, offerId) => {
  const addMember = {
    text: 'INSERT INTO hired_member (member_id, offer_id) VALUES ($1, $2) RETURNING *',
    values: [memberId, offerId],
  };
  return connection.query(addMember);
};

module.exports = addHiredMember;
