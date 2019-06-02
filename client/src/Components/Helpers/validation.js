const yup = require('yup');

const signupValidation = yup.object().shape({
  username: yup
    .string()
    .require()
    .min(3)
    .max(15),
  email: yup
    .string()
    .required()
    .max(20),
  password: yup
    .string()
    .required()
    .min(3)
    .max(15),
  confPassword: yup
    .string()
    .required()
    .min(3)
    .max(15),
});
export default { signupValidation };
