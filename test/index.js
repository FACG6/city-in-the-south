const { dbBuild, dbFakeData } = require('../server/database/config/db_build');

dbBuild()
  .then(dbFakeData)
  .then(() => require('./postOfferTypeOfferTest'))
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
  .catch(err => console.log(err));

