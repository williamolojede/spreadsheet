require('dotenv').config()
require('@babel/register');

const databaseURLs = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
  production: process.env.DATABASE_URL,
};

const environment = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
const databaseURL = databaseURLs[environment];
const isDevMode = environment !== 'production';

const config = {
  url: databaseURL,
  dialect,
  logging: isDevMode ? log => log : false,
  ssl: true,
  dialectOptions: {
    multipleStatements: true,
    ssl: {
      require: true,
      // Ref.: https://github.com/brianc/node-postgres/issues/2009
      rejectUnauthorized: false,
    },
  },
};

module.exports = config;
