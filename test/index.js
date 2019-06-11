const { dbBuild, dbFakeData } = require('../server/database/config/db_build');

dbBuild()
  .then(dbFakeData)
  .then(() => require('./getOfferTypeTest'))
  .catch(err => console.log(err));
