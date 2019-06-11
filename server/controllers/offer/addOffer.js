const { addOffer, addOfferType, addSkills, addOffersType } = require('./../../database/queries/offers/index');


module.exports = async (req, res) => {
  const { newSkills, newOffer_type, skills, offer_type, ...offer } = req.body;
  const skillsId = skills.map(skill => skill.id);
  const offer_typeIds = offer_type.map(type => type.id);

  const newSkillsId = await addSkills(newSkills);
  const allSkillsId = [...skillsId, ...newSkillsId];
  const newoffer_typeId = await addOffersType(newOffer_type);
  const offerId = (await addOffer(offer)).rows[0].id;
  console.log('Offer ID  : ', offerId);
  console.log('new offers ID  : ', [...newoffer_typeId, ...offer_typeIds]);
  console.log('all skills  ID  : ', allSkillsId);
  
};
