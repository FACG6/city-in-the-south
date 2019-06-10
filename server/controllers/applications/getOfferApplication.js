const getOfferApplications = require('../../database/queries/applications/getOfferApplications');

module.exports = (req, res, next) => {
  const { offerId } = req.params;
  getOfferApplications(offerId)
    .then((result) => {
      res.send({
        error: null,
        data: result.rows,
      });
    })
    .catch(() => next({ code: 500, msg: 'Internal Server Error!' }));
};
