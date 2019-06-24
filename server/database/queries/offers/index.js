const {
  addOfferDetails,
  addOfferSkill,
  addOfferTypes,
} = require('./addNewOffer');

const { getOffers } = require('./getOffers');

const { deleteOffer } = require('./deleteOffer');

const { checkOffer } = require('./checkOfferId');

module.exports = {
  addOfferDetails,
  addOfferSkill,
  addOfferTypes,
  getOffers,
  deleteOffer,
  checkOffer,
};
