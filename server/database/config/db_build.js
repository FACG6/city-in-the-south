const { readFileSync } = require('fs');
const path = require('path');

const dbConnection = require('./db_connection');

function dbBuild() {
  const sql = readFileSync(path.join(__dirname, 'db_build.sql')).toString();

  return dbConnection.query(sql);
}

function dbFakeData() {
  const sql = readFileSync(path.join(__dirname, 'db_fakeData.sql')).toString();

  return dbConnection.query(sql);
}

module.exports = { dbBuild, dbFakeData };
