const { dbBuild, dbFakeData } = require('../server/database/config/db_build');

dbBuild()
  .then(dbFakeData)
  .then(() => require('./getMyOffersTest'))
  .catch(err => console.log(err));
