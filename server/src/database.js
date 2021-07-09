const Pool = require('pg').Pool;
const config = '../../config.json'

const pool = new Pool({
    user: 'postgres',
    password: config.databasePassword,
    host: 'localhost',
    port: 5432,
    database: 'fileserver'
});

module.exports = pool;
