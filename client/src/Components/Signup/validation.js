import * as yup from 'yup';

const signupValidation = yup.object().shape({
  confPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .min(8)
    .max(254),
  password: yup
    .string()
    .required()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(254),
  email: yup
    .string()
    .email()
    .required()
    .min(3)
    .max(254),
  username: yup
    .string()
    .required()
    .min(3)
    .max(254),
});
export default signupValidation;
