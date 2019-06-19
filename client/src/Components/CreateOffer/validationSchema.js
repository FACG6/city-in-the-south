const yup = require('yup');

const newOfferValidation = yup.object().shape({
  title: yup.string().required(),
  position: yup.string().required(),
  description: yup.string().required(),
  offerType: yup
    .array()
    .of(yup.object().shape({ id: yup.number(), name: yup.string() }))
    .required(),
  skills: yup
    .array()
    .of(yup.object().shape({ id: yup.number(), name: yup.string() })),
});

export default newOfferValidation;
