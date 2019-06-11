
const { dbBuild, dbFakeData } = require('../server/database/config/db_build');

dbBuild()
  .then(dbFakeData)
  .then(() => require('./getSavedOfferTest'))
  .catch(err => console.log(err));
