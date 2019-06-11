const connection = require('../../config/db_connection');

exports.deleteOffer = id => connection.query('DELETE FROM offer WHERE offer.id = $1 ', [id]);
