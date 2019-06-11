const connection = require('../../config/db_connection');

exports.getOffers = offset => connection.query(`SELECT offer.* , COALESCE(json_agg(skill) FILTER (WHERE skill.id IS NOT NULL),'[]') AS skills,
COALESCE(json_agg(offer_type) FILTER (WHERE skill.id IS NOT NULL),'[]') AS offer_types FROM offer
LEFT OUTER JOIN offer_skill ON offer_skill.offer_id = offer.id
LEFT OUTER JOIN skill ON skill.id = offer_skill.skill_id
LEFT OUTER JOIN offer_offer_type ON offer_offer_type.offer_id = offer.id
LEFT OUTER JOIN offer_type ON offer_type.id = offer_offer_type.offer_type_id
GROUP BY offer.id LIMIT 100 OFFSET $1`, [offset]);
