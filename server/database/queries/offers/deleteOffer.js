const connection = require('../../config/db_connection');

const deleteOffer = id => connection.query('DELETE FROM offer WHERE offer.id = $1 ', [id]);

module.exports = { deleteOffer };
