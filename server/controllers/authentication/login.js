const { sign } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { checkUsername } = require('../../database/queries/authentication/checkData');
const { loginSchema } = require('../../helpers/validation-schema');

module.exports = (req, res, next) => {
  const memberInfo = { ...req.body };
  loginSchema
    .validate(memberInfo)
    .then(() => {
      checkUsername(memberInfo.username)
        .then(({ rows: member }) => {
          if (member[0]) {
            bcrypt.compare(memberInfo.pass, member[0].pass, (err, valid) => {
              if (err) return next({ code: 400, msg: 'Bad Request ' });
              if (valid) {
                const { id, username, avatar } = { ...member[0] };
                const payload = { id, username, avatar };
                const token = sign(payload, process.env.SECRET);
                res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 * 1 }, { httpOnly: true });
                res.status(200).send({ error: null, data: payload });
              } else next({ code: 400, msg: 'Check your password' });
            });
          } else next({ code: 400, msg: 'Username does not exist' });
        })
        .catch(err => next(err));
    })
    .catch((err) => {
      next({ code: 400, msg: 'Ensure you enter validly data ' });
    });
};
