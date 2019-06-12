const { getOffers } = require('./../../database/queries/offers/getOfferId');

module.exports = (req, res, next) => {
  const { offerId } = req.params;
  getOffers(offerId)
    .then(({ rows }) => res.status(200).send({ error: null, data: rows }))
    .catch(err => next(err));
};
