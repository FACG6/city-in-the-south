const { dbBuild, dbFakeData } = require('../server/database/config/db_build');

dbBuild()
  .then(dbFakeData)
  .then(() => require('./getMyApplication'))
  .then(() => require('./getMyApplications'))
  .then(() => require('./add-offer'))
  .catch(err => console.log(err));
