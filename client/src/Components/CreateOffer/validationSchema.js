const yup = require('yup');

const newOfferValidation = yup.object().shape({
  title: yup.string().required(),
  position: yup.string().required(),
  description: yup.string().required(),
});

export default newOfferValidation;
