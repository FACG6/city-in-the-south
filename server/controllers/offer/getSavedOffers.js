const { getSavedOffer } = require('../../database/queries/offers/getSavedOffer.js');

module.exports = (req, res) => {
  const { memberId } = req.params;
  getSavedOffer(memberId)
    .then(result => res.send({
      error: null,
      data: result.rows,
    }));
};
