module.exports = (req, res, next) => {
  const { user } = req;
  if (user) {
    res.send({ success: true, data: user });
  } else {
    next({ code: 401, msg: 'Un Authorized' });
  }
};
