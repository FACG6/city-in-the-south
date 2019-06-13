module.exports = (req, res, next) => {
  res.clearCookie('jwt');
  res.status(200).send({
    error: null,
    data: 'success',
  });
};
