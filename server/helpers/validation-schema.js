const yup = require('yup');

exports.singUpSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  email: yup.string().email({ minDomainAtoms: 2 }),
  pass: yup.string().min(8).required(),
});

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
