const { getMyOffer } = require('../../database/queries/offers/getMyOffer');

module.exports = (req, res) => {
  const { memberId } = req.params;
  getMyOffer(memberId)
    .then(result => res.send({
      error: null,
      data: result.rows,
    }));
};
