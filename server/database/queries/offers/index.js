const connection = require('../../config/db_connection');

exports.getOffers = () => connection.query(`select offer.* , COALESCE(json_agg(skill) filter (where skill.id is not null),'[]') as skills, COALESCE(json_agg(offer_type) filter (where skill.id is not null),'[]') as offer_types from offer
left outer join offer_skill ON offer_skill.offer_id = offer.id
left outer JOIN skill ON skill.id = offer_skill.skill_id
left outer join offer_offer_type ON offer_offer_type.offer_id = offer.id
LEFT outer JOIN offer_type ON offer_type.id = offer_offer_type.offer_type_id
GROUP BY offer.id`);
