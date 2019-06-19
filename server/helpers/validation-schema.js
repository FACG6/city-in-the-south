const yup = require('yup');

exports.singUpSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  email: yup.string().email({ minDomainAtoms: 2 }),
  pass: yup.string().min(8).required(),
});

exports.loginSchema = yup.object().shape({
  username: yup.string().required(),
  pass: yup.string().required(),
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

exports.postSkillSchema = yup.object().shape({
  name: yup.string().required(),
});

exports.educationSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().required(),
  date: yup.date().required(),
  university: yup.string().required(),
  description: yup.string().required(),
  memberId: yup.number().required(),
});

exports.experienceSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().required(),
  endDate: yup.date().required(),
  startDate: yup.date().required(),
  location: yup.string().required(),
  description: yup.string().required(),
  memberId: yup.number().required(),
});
