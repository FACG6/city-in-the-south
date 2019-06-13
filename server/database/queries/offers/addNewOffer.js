const connection = require('./../../config/db_connection');

const addOfferDetails = (title, position, description, memberId) => {
  const offerObj = {
    text: 'INSERT INTO offer (title, position, description, member_id) VALUES($1, $2, $3, $4) RETURNING *',
    values: [title, position, description, memberId],
  };
  return connection.query(offerObj);
};

const addOfferSkill = (offerId, skillId) => {
  const offerSkills = {
    text: 'INSERT INTO offer_skill (offer_id, skill_id) VALUES ($1, $2) RETURNING *',
    values: [offerId, skillId],
  };
  return connection.query(offerSkills);
};

const addOfferTypes = (offerId, offerTypeId) => {
  const offerTypes = {
    text: 'INSERT INTO offer_offer_type (offer_id, offer_type_id) VALUES($1,$2) RETURNING *',
    values: [offerId, offerTypeId],
  };
  return connection.query(offerTypes);
};

module.exports = {
  addOfferDetails,
  addOfferSkill,
  addOfferTypes,
};
