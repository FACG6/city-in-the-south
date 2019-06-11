const { getMyOffer } = require('../../database/queries/offers/getMyOffer');

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  getMyOffer(memberId)
    .then(result => res.send({
      error: null,
      data: result.rows,
    })).catch(() => next({ code: 500, msg: 'internal server error' }));
};
