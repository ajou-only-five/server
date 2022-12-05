import oracledb from 'oracledb';

import "../env/env.js";
import { TypeChecker } from "../utils/index.js";
import { DBStatusEnum } from "./db_status.js";

/**
 * @author Jang Seongho
 * 
 * @constant
 * @type {Object}
 * 
 * @description
 * The oracle db helper
 * 
 * This offers these:
 * @returns { function }
 * * connection: get oracle-db connection.
 * 
 * @returns { bool }
 * * isConnected(): get the server is connected oracle-db.
 * 
 * @throws {'oracledb get connection is failed'} the server fails connect to oracle-db.
 */

const oracleDbHelper = (function () {
    const oracleDbHelper = function () { };

    oracleDbHelper.prototype.init = async () => {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: process.env.ORACLE_USER,
                password: process.env.ORACLE_PASSWORD,
                connectionString: process.env.ORACLE_CONNECTION_STRING,
            });
            return connection;
        } catch (err) {
            console.error(err);
        } finally {
            if (!connection) {
                console.log(connection);
                throw 'oracledb get connection is failed';
            }
        }
    };

    /**
     * hello
     */
    oracleDbHelper.prototype.isConnected = () => {
        if (oracleDbHelper.connection === null) {
            return false;
        }

        return true;
    };

    return new oracleDbHelper();
})();

oracleDbHelper.init()
.then((connection) => {
    oracleDbHelper.connection = connection;
})
.catch(console.error);

export default oracleDbHelper;