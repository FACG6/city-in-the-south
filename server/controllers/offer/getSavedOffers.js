const { getSavedOffer } = require('../../database/queries/offers/getSavedOffer.js');

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  getSavedOffer(memberId)
    .then(result => res.send({
      error: null,
      data: result.rows,
    }))
    .catch(er => next(er));
};
