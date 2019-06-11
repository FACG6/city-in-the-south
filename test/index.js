const { dbBuild, dbFakeData } = require('../server/database/config/db_build');

dbBuild()
  .then(dbFakeData)
  .then(() => require('./addHiredMember'))
  .then(() => require('./getMyApplication'))
  .then(() => require('./getMyApplications'))
  .catch(err => console.log(err));
