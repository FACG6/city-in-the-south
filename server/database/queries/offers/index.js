const {
  addOfferDetails,
  addOfferSkill,
  addOfferTypes,
} = require('./addNewOffer');

const { getOffers } = require('./getOffers');

const { deleteOffer } = require('./deleteOffer');

module.exports = {
  addOfferDetails,
  addOfferSkill,
  addOfferTypes,
  getOffers,
  deleteOffer,
};
