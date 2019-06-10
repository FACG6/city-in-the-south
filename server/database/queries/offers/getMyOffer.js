const dbconnection = require('../../config/db_connection.js');

const getMyOffer = memberId => dbconnection.query('SELECT offer.status,offer.position,offer.title,offer.description,offer.member_id FROM offer INNER JOIN member ON offer.member_id = member.id WHERE offer.member_id = $1 ', [memberId]);
module.exports = { getMyOffer };
