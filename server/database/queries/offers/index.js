const connection = require('./../../config/db_connection');


const addOffer = (offerInf) => {
  // console.log(offerInf);
  const offerObj = {
    text: 'INSERT INTO offer (title, position, description, member_id) VALUES($1, $2, $3, $4) RETURNING id',
    values: [offerInf.title, offerInf.position, offerInf.description, offerInf.member_id],
  };
  return connection.query(offerObj);
};

const addSkill = name => {
  const skillsObj = {
    text: 'INSERT INTO skill (name) VALUES ($1) RETURNING id',
    values: [name],
  };
  return connection.query(skillsObj);
};

const addSkills = (skills = []) => {
  const insertSkillsPromise = skills.map(skill => addSkill(skill));
  return new Promise((resolve, reject) => {
    Promise.all(insertSkillsPromise).then(skills => {
      const skillsId = skills.map(skill => skill.rows[0].id);
      resolve(skillsId);
    }).catch(err => reject(err));
  });
};

const addOfferType = name => {
  const offerTypeObj = {
    text: 'INSERT INTO offer_type (name) VALUES ($1) RETURNING id',
    values: [name],
  };
  return connection.query(offerTypeObj);
};

const addOffersType = (offerTypes = []) => {
  const insertOfferTypePromise = offerTypes.map(offerType => addOfferType(offerType));
  return new Promise((resolve, reject) => {
    Promise.all(insertOfferTypePromise)
      .then(offerTypes => {
        const offerTypeId = offerTypes.map(offerType => offerType.rows[0].id);
        resolve(offerTypeId);
      }).catch(err => reject(err));
  });
};

const addOfferSkill = (offerId, skillId) => {
  const obj = {
    text: 'INSERT INTO offer_skill (offer_id, skill_id) values($1,$2)',
    values: [offerId, skillId],
  };
  return connection.query(obj);
};

const addOfferOfferType = (offerId, offerTypeId) => {
  const obj = {
    text: 'INSERT INTO offer_offer_type (offer_id, offer_type_id) values($1,$2)',
    values: [offerId, offerTypeId],
  };
  return connection.query(obj);
};

module.exports = { addOffer, addOfferType, addSkills, addOffersType, addOfferOfferType, addOfferSkill };
