import * as yup from 'yup';

const signupValidation = yup.object().shape({
  confPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Password did not match: Please try again...'
    )
    .max(254)
    .min(8)
    .required(),
  password: yup
    .string()
    .max(254)
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required(),
  email: yup
    .string()
    .max(254)
    .email()
    .required(),
  username: yup
    .string()
    .max(254)
    .min(3)
    .required(),
});
export default signupValidation;
