import * as yup from 'yup';

const signupValidation = yup.object().shape({
  confPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Password did not match: Please try again...'
    )
    .min(8)
    .max(254)
    .required(),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required()
    .max(254),
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
