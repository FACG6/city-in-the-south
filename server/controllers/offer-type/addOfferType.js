const { addOfferType } = require('../../database/queries/offer-type/postOfferType.js');

module.exports = (req, res, next) => {
  const Name = req.body;
  addOfferType(Name)
    .then((result) => {
      res.send({
        error: null,
        data: result.rows,
      });
    }).catch(() => next({ code: 500, msg: 'internal server error' }));
};
