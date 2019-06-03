const { Pool } = require('pg');
require('dotenv').config();

let connectionString = '';

switch (process.env.NODE_ENV) {
  case 'testing': connectionString = process.env.TESTING_DB; break;
  case 'production': connectionString = process.env.DATABASE_HEROCU; break;
  case 'development': connectionString = process.env.DATABASE_URL; break;
  default: throw new Error('not found the DB_URL');
}

module.exports = new Pool({
  connectionString,
});
