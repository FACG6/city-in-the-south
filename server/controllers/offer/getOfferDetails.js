const getOfferId = require('./../../database/queries/offers/getOfferId');

module.exports = (req, res) => {
  console.log(11111111111)
  const { offerId } = req.params;
  console.log(offerId)
  getOfferId(offerIds).then(val => console.log(val));
  console.log(111111);
};
