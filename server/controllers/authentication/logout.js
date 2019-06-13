module.exports = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ error: null, data: 'success' });
};
