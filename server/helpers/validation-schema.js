const yup = require('yup');

exports.SavedOfferSchema = yup.object().shape({
  memberId: yup.number()
    .required()
    .positive()
    .integer(),
  offerId: yup.number()
    .required()
    .positive()
    .integer(),
});

exports.postSkillSchema = yup.object().shape({
  name: yup.string().required(),
});
