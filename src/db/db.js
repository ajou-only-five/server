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

export default (function () {
    const generateColumnsString = (columns) => {
        if (!Array.isArray(columns)) {
            return null;
        }

        if (columns.length === 1) {
            return `(${columns[0]})`;
        }

        let str = "";

        for (let index = 0; index < columns.length; index++) {
            if (index === 0) {
                str += `(${columns[index]}, `;
                continue;
            }

            if (index === columns.length - 1) {
                str += `${columns[index]})`;
                break;
            }

            str += `${columns[index]}, `;
        }

        return str;
    }

    const generateDataString = (data) => {
        if (!Array.isArray(data)) {
            return null;
        }

        if (data.length === 1) {
            return `(:1)`;
        }

        let str = "";

        for (let index = 0; index < data.length; index++) {
            if (index === 0) {
                str += `(:${index + 1}, `;
                continue;
            }

            if (index === data.length - 1) {
                str += `:${index + 1})`;
                break;
            }

            str += `:${index + 1}, `;
        }

        return str;
    };

    const oracleDbHelper = function () {
        this.connection = null;
    };

    oracleDbHelper.prototype.init = async () => {
        try {
            oracleDbHelper.connection = await oracledb.getConnection({
                user: process.env.ORACLE_USER,
                password: process.env.ORACLE_PASSWORD,
                connectionString: process.env.ORACLE_CONNECTION_STRING,
            });
        } catch (err) {
            console.error(err);
        } finally {
            if (!oracleDbHelper.connection) {
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

    oracleDbHelper.prototype.insert = async ({ table, columns, data }) => {
        if (!oracleDbHelper.prototype.isConnected()) {
            return {
                ...DBStatusEnum.notInitialized
            };
        }

        let isColumnsNull;

        if (columns === undefined) {
            isColumnsNull = true;
        } else {
            isColumnsNull = false;
        }

        if (!TypeChecker.isString(table)) {
            return {
                ...DBStatusEnum.parameterTypeError
            };
        }

        if (!isColumnsNull && !Array.isArray(columns)) {
            return {
                ...DBStatusEnum.parameterTypeError
            };
        }

        if (!Array.isArray(data)) {
            return {
                ...DBStatusEnum.parameterTypeError
            };
        }

        let sql;

        if (isColumnsNull) {
            sql = `INSERT INTO ${table} VALUES ${generateDataString(data)}`;

            try {
                const result = await oracleDbHelper.connection.execute(sql, data);
                await oracleDbHelper.connection.commit();
                return {
                    ...DBStatusEnum.success
                };
            } catch (e) {
                console.log(e);
                return {
                    ...DBStatusEnum.executeError
                };
            }
        }

        if (columns.length !== data.length) {
            return {
                ...DBStatusEnum.parameterLengthError
            };
        }

        sql = `INSERT INTO ${table} ${generateColumnsString(columns)} VALUES ${generateDataString(data)}`;

        try {
            const result = await oracleDbHelper.connection.execute(sql, data);
            await oracleDbHelper.connection.commit();

            return {
                ...DBStatusEnum.success
            };
        } catch (e) {
            console.log(e);
            return {
                ...DBStatusEnum.executeError
            };
        }
    };

    oracleDbHelper.prototype.insertMany = async ({ table, columns, dataList }) => {
        if (!oracleDbHelper.prototype.isConnected()) {
            return {
                ...DBStatusEnum.notInitialized
            };
        }

        let isColumnsNull;

        if (columns === undefined) {
            isColumnsNull = true;
        } else {
            isColumnsNull = false;
        }

        if (!TypeChecker.isString(table)) {
            return {
                ...DBStatusEnum.parameterTypeError
            };
        }

        if (!isColumnsNull && !Array.isArray(columns)) {
            return {
                ...DBStatusEnum.parameterTypeError
            };
        }

        if (!Array.isArray(dataList)) {
            return {
                ...DBStatusEnum.parameterTypeError
            };
        }

        if (!Array.isArray(dataList[0])) {
            return {
                ...DBStatusEnum.parameterTypeError
            };
        }

        let length = dataList[0].length;

        for (const data of dataList) {
            if (!Array.isArray(data)) {
                return {
                    ...DBStatusEnum.parameterTypeError
                };
            }

            if (length !== data.length) {
                return {
                    ...DBStatusEnum.parameterLengthError
                };
            }
        }

        let sql;

        if (isColumnsNull) {
            sql = `INSERT INTO ${table} VALUES ${generateDataString(dataList[0])}`;

            try {
                await oracleDbHelper.connection.executeMany(sql, dataList);
                await oracleDbHelper.connection.commit();
                return {
                    ...DBStatusEnum.success
                };
            } catch (e) {
                console.log(e);
                return {
                    ...DBStatusEnum.executeError
                };
            }
        }

        if (columns.length !== length) {
            return {
                ...DBStatusEnum.parameterLengthError
            };
        }

        sql = `INSERT INTO ${table} ${generateColumnsString(columns)} VALUES ${generateDataString(dataList[0])}`;

        try {
            await oracleDbHelper.connection.executeMany(sql, dataList);
            await oracleDbHelper.connection.commit();

            return {
                ...DBStatusEnum.success
            };
        } catch (e) {
            console.log(e);
            return {
                ...DBStatusEnum.executeError
            };
        }
    };

    oracleDbHelper.prototype.select = async ({ table, columns, where, parameters, option }) => {
        if (!oracleDbHelper.prototype.isConnected()) {
            return {
                ...DBStatusEnum.notInitialized
            };
        }

        let isColumnsNull;
        let isWhereNull;
        let isParametersNull;

        if (columns === undefined) {
            isColumnsNull = true;
        } else {
            isColumnsNull = false;
        }

        if (where === undefined) {
            isWhereNull = true;
        } else {
            isWhereNull = false;
        }

        if (parameters === undefined) {
            isParametersNull = true;
        } else {
            isParametersNull = false;
        }

        if (!TypeChecker.isString(table)) {
            return {
                ...DBStatusEnum.parameterTypeError
            };
        }

        if (!isWhereNull && !TypeChecker.isString(where) && !isParametersNull && !Array.isArray(parameters)) {
            return {
                ...DBStatusEnum.parameterTypeError
            };
        }

        let sql;

        if (isWhereNull) {
            sql = isColumnsNull
                ? `SELECT * FROM ${table}`
                : `SELECT ${generateColumnsString(columns).replace("(", "").replace(")", "")} FROM ${table}`;

            try {
                const result = option === undefined
                    ? await oracleDbHelper.connection.execute(sql)
                    : await oracleDbHelper.connection.execute(sql, option);
                    await oracleDbHelper.connection.commit();
                return {
                    ...DBStatusEnum.success,
                    data: result.rows
                };
            } catch (e) {
                console.log(e);
                return {
                    ...DBStatusEnum.executeError
                };
            }
        }

        sql = isColumnsNull
            ? `SELECT * FROM ${table} WHERE ${where}`
            : `SELECT ${generateColumnsString(columns).replace("(", "").replace(")", "")} FROM ${table} WHERE ${where}`;

        try {
            const result = option === undefined
                ? await oracleDbHelper.connection.execute(sql)
                : await oracleDbHelper.connection.execute(sql, option);
                await oracleDbHelper.connection.commit();
            return {
                ...DBStatusEnum.success,
                data: result.rows
            };
        } catch (e) {
            console.log(e);
            return {
                ...DBStatusEnum.executeError
            };
        }


    };

    return new oracleDbHelper();
})();