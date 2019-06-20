const getOffer = require('./../../database/queries/offers/getOfferId');
const { getOfferOfferType } = require('../../database/queries/offer-type/getOfferOfferType');
const { getOfferSkills } = require('../../database/queries/skills');

module.exports = (req, res, next) => {
  const { offerId } = req.params;
  Promise.all([getOffer(offerId), getOfferSkills(offerId), getOfferOfferType(offerId)])
    .then((values) => {
      const offer = values[0].rows[0];
      const skills = values[1].rows;
      const offerType = values[2].rows;
      offer.skills = skills;
      offer.offer_types = offerType;
      res.status(200).send({ error: null, data: offer });
    })
    .catch(err => next(err));
};

// res.status(200).send({ error: null, data: rows[0] });
