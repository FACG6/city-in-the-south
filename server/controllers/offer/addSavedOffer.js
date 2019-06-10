const { addSavedOffers } = require('../../database/queries/offers/saved-offers');

module.exports = (req, res, next) => {
  const savedOfferInfo = req.body;
  addSavedOffers(savedOfferInfo)
    .then(({ rows: saved }) => {
      if (!saved[0]) return next({ code: 400, msg: 'Bad Request ' });
      return res.status(200).send({ error: null, data: saved[0] });
    })
    .catch(err => next(err));
};
