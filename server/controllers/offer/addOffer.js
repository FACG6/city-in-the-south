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
    .of(yup.object().shape({ id: yup.number(), name: yup.string() })).required(),
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
  let offerDetails;
  newOfferValidation
    .validate(
      OfferInfo,
      { abortEarly: false },
    )
    .then(() => addOfferDetails(offerDetail))
    .then((response) => {
      offerDetails = { ...response.rows[0] };
    })
    .then(() => {
      if (OfferInfo.skills[0]) {
        return Promise.all(OfferInfo.skills.map(item => addOfferSkill(offerDetails.id, item.id)));
      }
    })
    .then(() => {
      if (OfferInfo.offerType[0]) {
        return Promise.all(OfferInfo.offerType.map(item => addOfferTypes(offerDetails.id, item.id)));
      }
    })
    .then(() => {
      res.send({
        error: null,
        data: offerDetails,
      });
    })
    .catch(() => next({ code: 400, msg: 'Ensure you enter validly data ' }));
};
