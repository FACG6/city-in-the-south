const { SavedOfferSchema } = require('../../helpers/validation-schema');

const { addSavedOffers } = require('../../database/queries/offers/saved-offers');
const { checkOffers } = require('../../database/queries/offers/getSavedOffer');

module.exports = (req, res, next) => {
  const savedOfferInfo = req.body;
  const { memberId, offerId } = req.body;
  SavedOfferSchema
    .validate(savedOfferInfo)
    .then(() => {
      checkOffers(memberId, offerId)
        .then(({ rows }) => {
          if (!rows[0]) {
            addSavedOffers(savedOfferInfo)
              .then(({ rows: savedOffers }) => res.status(200)
                .send({ error: null, data: savedOffers }))
              .catch(err => next(err));
          } else next({ code: 400, msg: 'this offer already saved' });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure to enter validly data' }));
};
