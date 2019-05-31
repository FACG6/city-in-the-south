const yup = require('yup');

const schema = yup.object().shape({
  title: yup.string().required(),
  position: yup.string().required(),
  description: yup.string().required(),
});

export { schema };
