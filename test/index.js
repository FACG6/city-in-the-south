const { dbBuild, dbFakeData } = require('../server/database/config/db_build');

dbBuild()
  .then(dbFakeData)
  // eslint-disable-next-line global-require
  .then(() => require('./getMemberSkills'))
  .then(() => require('./getOffersRoute'))
  .then(() => require('./getMyApplication'))
  .then(() => require('./getMyApplications'))
  .then(() => require('./saved-offer-test'))
  .then(() => require('./getSavedOfferTest'))
  .catch(err => console.log(err));
