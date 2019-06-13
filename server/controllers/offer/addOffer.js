const {
  addOfferDetails,
  addOfferSkill,
  addOfferTypes,
} = require('./../../database/queries/offers/index');


module.exports = (req, res, next) => {
  const {
    title, position, description, skills, offer_types, member_id,
  } = req.body;
  let offerDetails;
  addOfferDetails(title, position, description, member_id)
    .then((response) => {
      skills.map((item) => {
        offerDetails = { ...response.rows[0] };
        addOfferSkill(offerDetails.id, item.id);
      });
    })
    .then(() => offer_types.map(item => addOfferTypes(offerDetails.id, item.id)))
    .then(() => {
      res.send({
        error: null,
        data: offerDetails,
      });
    })
    .catch(err => next(err));
};
