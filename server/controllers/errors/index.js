exports.notFound = (req, res) => {
  res.send('not found');
};


exports.serverError = (err, req, res, next) => {
  console.log(err);
  res.send('Error 500');
};
