const { dbBuild, dbFakeData } = require('../server/database/config/db_build');

dbBuild()
  .then(dbFakeData)
  // eslint-disable-next-line global-require
  .then(() => require('./getOffersRoute'))
  .catch(err => console.log(err));
