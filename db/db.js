require('dotenv').config({ path: './.env.local' });
const oracledb = require('oracledb');

const init = async () => {

    let connection;
    const user = process.env.ORACLE_USER;
    const password = process.env.ORACLE_PASSWORD;
    const connectionString = process.env.ORACLE_CONNECTION_STRING;

    try {
        connection = await oracledb.getConnection({ user: user, password: password, connectionString: connectionString });
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            return connection;
        } else {
            throw 'oracledb get connection is failed';
        }
    }
}

module.exports = { init };

