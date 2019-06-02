const logout = (request, response, next) => {
  console.log('logout get');
  next();
};

module.exports = logout;
