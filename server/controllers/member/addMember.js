const { sign } = require('jsonwebtoken');

const { addMmeber } = require('../../database/queries/members/addMember');
const { checkEmail } = require('../../database/queries/authentication/checkEmail');
const { checkUsername } = require('../../database/queries/authentication/getUser');
const { singUpSchema } = require('../../helpers/validation-schema');
const { hashingPass } = require('../../helpers/hashPassword');

module.exports = (req, res, next) => {
  const memberInfo = { ...req.body };
  singUpSchema.validate(memberInfo, {
    abortEarly: false,
  })
    .then(() => {
      checkUsername(memberInfo.username)
        .then(({ rows: validUsername }) => {
          if (validUsername[0]) throw next({ code: 400, msg: 'The username already exists ' });
          else return checkEmail(memberInfo.email);
        })
        .then(({ rows: validEmail }) => {
          if (validEmail[0]) throw next({ code: 400, msg: 'The email already exists' });
          else return hashingPass(memberInfo.pass);
        })
        .then(hashedPass => addMmeber({ ...memberInfo, pass: hashedPass }))
        .then(({ rows: member }) => {
          const payLoad = {
            id: member[0].id, username: member[0].username, avatar: member[0].avatar,
          };
          const jwt = sign(payLoad, process.env.SECRET);
          res.cookie('jwt', jwt, { maxAge: 7200000 });
          return res.status(200).send({ error: null, data: [payLoad] });
        })
        .catch(err => next(err));
    })
    .catch(err => next({ code: 400, msg: err.errors }));
};
