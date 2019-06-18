const yup = require('yup');

const validationSchema = yup.object().shape({
  proposal: yup.string().required(),
});

export default validationSchema;
