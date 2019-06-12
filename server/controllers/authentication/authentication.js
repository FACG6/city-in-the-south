const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  const secret = process.env.SECRET;
  if (jwt && secret) {
    verify(jwt, secret, (err, decoded) => {
      if (decoded) req.auth = decoded;
      else res.clearCookie('jwt');
      next();
    });
  } else next({ code: 400, msg: 'you are not authenticated' });
};
