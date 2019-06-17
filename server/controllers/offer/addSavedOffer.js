const { SavedOfferSchema } = require('../../helpers/validation-schema');

const { addSavedOffers } = require('../../database/queries/offers/saved-offers');

module.exports = (req, res, next) => {
  const savedOfferInfo = req.body;
  SavedOfferSchema
    .validate(savedOfferInfo)
    .then(() => {
      addSavedOffers(savedOfferInfo)
        .then(({ rows: savedOffers }) => res.status(200).send({ error: null, data: savedOffers }))
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure to enter validly data' }));
};
