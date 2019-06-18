const { getOffer } = require('./../../database/queries/offers/getOfferId');

module.exports = (req, res, next) => {
  const { offerId } = req.params;
  getOffer(offerId)
    .then(({ rows }) => res.status(200).send({ error: null, data: rows[0] }))
    .catch(err => next(err));
};
