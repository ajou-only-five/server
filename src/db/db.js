import "../env/env.js";
import pkg from 'oracledb' ;
const oracledb = pkg;
/**
 * @author Jang Seongho
 * 
 * @constant
 * @type {Object}
 * 
 * @description
 * The closure of oracle-db connector.
 * 
 * This offers these:
 * 
 * @returns { Object }
 * * connection: get oracle-db connection.
 * 
 * @returns { bool }
 * * isConnected(): get the server is connected oracle-db.
 * 
 * @throws {'oracledb get connection is failed'} the server fails connect to oracle-db.
 */

export const oracleDbConnector = (() => {
    let _connection = null;

    const _user = process.env.ORACLE_USER;
    const _password = process.env.ORACLE_PASSWORD;
    const _connectionString = process.env.ORACLE_CONNECTION_STRING;

    return {
        get connection () {
            return _connection;
        },
        init: async () => {
            try {
                _connection = await oracledb.getConnection({ user: _user, password: _password, connectionString: _connectionString });
            } catch (err) {
                console.error(err);
            } finally {
                if (!_connection) {
                    throw 'oracledb get connection is failed';
                }
            }
        },
        isConnected: () => {
            if(_connection === null) {
                return false;
            }

            return true;
        }
    }
})();

oracleDbConnector.init();