require("dotenv").config({path: "../.env"});

const { Pool } = require("pg");

/**
 * DB설정에 관한 object
 */
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: process.env.DB_POOL,
}

const pool = new Pool(config);

module.exports.pool = pool;