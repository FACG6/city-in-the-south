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
  .then(() => require('./getOfferApplications'))
  .then(() => require('./getMyOffersTest'))
  .then(() => require('./addHiredMember'))
  .then(() => require('./deleteOffer'))
  .then(() => require('./getOfferTypeTest'))
  .then(() => require('./addMember'))
  .catch(err => console.log(err));
