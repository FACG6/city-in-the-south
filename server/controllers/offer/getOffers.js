const { getOffers } = require('../../database/queries/offers/index');

module.exports = (req, res, next) => {
  getOffers()
    .then((response) => {
      console.log(11111, response.rows);
      res.send({
        error: null,
        data: response.rows,
      });
    })
    .catch(err => next(err));
};
