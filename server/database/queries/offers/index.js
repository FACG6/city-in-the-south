const connection = require('../../config/db_connection');

exports.getOffers = () => connection.query('select offer.*, (select json_agg(skill) from(select * from skill) as skill) as skills, (select json_agg(offer_type) from(select * from offer_type) as offer_type) as offer_types from offer left outer join offer_skill ON offer_skill.offer_id = offer.id left JOIN skill ON skill.id = offer_skill.skill_id left join offer_offer_type ON offer_offer_type.offer_id = offer.id LEFT JOIN offer_type ON offer_type.id = offer_offer_type.offer_type_id GROUP BY offer.id');
