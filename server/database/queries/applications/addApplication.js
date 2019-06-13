const connection = require('../../config/db_connection');

const addApplication = (memberId, offerId, proposal) => {
  const addNewApplication = {
    text: 'INSERT INTO APPLICATION (MEMBER_ID, OFFER_ID, PROPOSAL) VALUES ($1, $2, $3) RETURNING *',
    values: [memberId, offerId, proposal],
  };
  return connection.query(addNewApplication);
};

module.exports = addApplication;
