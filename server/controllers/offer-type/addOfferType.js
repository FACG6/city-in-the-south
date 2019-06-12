const { addOfferType } = require('../../database/queries/offer-type/postOfferType.js');

module.exports = (req, res, next) => {
  const name = req.body;
  console.log(name);

  addOfferType(name)
    .then((result) => {
      res.send({
        error: null,
        data: result.rows[0],
      });
    }).catch(() => next({ code: 500, msg: 'internal server error' }));
};
