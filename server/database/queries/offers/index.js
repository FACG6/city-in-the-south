const connection = require('../../config/db_connection');

exports.getOffers = () => connection.query(`select offer.* , json_agg(skill) as skills, json_agg(offer_type) as offer_types from offer
left outer join offer_skill ON offer_skill.offer_id = offer.id
left outer JOIN skill ON skill.id = offer_skill.skill_id
left outer join offer_offer_type ON offer_offer_type.offer_id = offer.id
LEFT outer JOIN offer_type ON offer_type.id = offer_offer_type.offer_type_id
where offer_skill.skill_id is not null
GROUP BY offer.id`);
