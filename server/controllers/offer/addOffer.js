const yup = require('yup');

const {
  addOfferDetails,
  addOfferSkill,
  addOfferTypes,
} = require('./../../database/queries/offers/index');

const newOfferValidation = yup.object().shape({
  title: yup.string().required(),
  position: yup.string().required(),
  description: yup.string().required(),
  offerType: yup
    .array()
    .of(yup.object().shape({ id: yup.number(), name: yup.string() })),
  skills: yup
    .array()
    .of(yup.object().shape({ id: yup.number(), name: yup.string() })),
  memberId: yup.number().required(),
});


module.exports = (req, res, next) => {
  const {
    title, position, description, skills, offerType, memberId,
  } = req.body;
  const OfferInfo = {
    title, position, description, skills, offerType, memberId,
  };
  const offerDetail = {
    title, position, description, memberId,
  };
  newOfferValidation
    .validate(
      OfferInfo,
      { abortEarly: false },
    )
    .then(() => {
      let offerDetails;
      addOfferDetails(offerDetail)
        .then((response) => {
          offerDetails = { ...response.rows[0] };
          if (OfferInfo.skills[0]) {
            OfferInfo.skills.map(item => addOfferSkill(offerDetails.id, item.id));
          }
          if (OfferInfo.offerType[0]) {
            offerType.map(item => addOfferTypes(offerDetails.id, item.id));
          }
        })
        .then(() => {
          res.send({
            error: null,
            data: offerDetails,
          });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure you enter validly data ' }));
};
