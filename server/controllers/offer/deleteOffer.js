const { deleteOffer } = require('../../database/queries/offers/index');

module.exports = (req, res, next) => {
  deleteOffer(req.params.offerId)
    .then(() => res.send({
      error: null,
      data: 'success',
    }))
    .catch(err => next(err));
};
