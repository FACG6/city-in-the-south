const connection = require('../../config/db_connection');

const deleteOffer = (offerId, memberId) => connection.query('DELETE FROM offer WHERE offer.id = $1 AND offer.member_id = $2', [offerId, memberId]);

module.exports = { deleteOffer };
