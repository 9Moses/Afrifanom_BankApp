const { Pool } = require("pg");
const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
} = require("../config/db_config");

//Create a connection to the database
const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_NAME,
  port: DB_PORT,
});

module.exports = pool;
