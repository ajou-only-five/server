import { TypeChecker } from "../utils/type_check.js";
import { oracleDbConnector } from "./db.js";
import { DBStatusEnum } from "./db_status.js";

export const oracleDbHelper = (() => {
    const _generateColumnsString = (columns) => {
        if (!Array.isArray(columns)) {
            return null;
        }

        if (columns.length === 1) {
            return `(${columns[0]})`;
        }

        let str = "";

        for(let index = 0; index < columns.length; index++) {
            if(index === 0) {
                str += `(${columns[index]}, `;
                continue;
            }

            if(index === columns.length - 1) {
                str += `${columns[index]})`;
                break;
            }

            str += `${columns[index]}, `;
        }

        return str;
    }

    const _generateDataString = (data) => {
        if (!Array.isArray(data)) {
            return null;
        }

        if (data.length === 1) {
            return `(:1)`;
        }

        let str = "";

        for(let index = 0; index < data.length; index++) {
            if(index === 0) {
                str += `(:${index + 1}, `;
                continue;
            }

            if(index === data.length - 1) {
                str += `:${index + 1})`;
                break;
            }

            str += `:${index + 1}, `;
        }

        return str;
    }

    return {
        insert: async ({table, columns, data}) => {
            if(!oracleDbConnector.isConnected()) {
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
                sql = `INSERT INTO ${table} VALUES ${_generateDataString(data)}`;

                console.log(sql);

                try {
                    // await oracleDbConnector.connection.execute(sql, data);

                    return {
                        ...DBStatusEnum.success
                    };
                } catch (e) {
                    return {
                        ...DBStatusEnum.executeError
                    };
                }
            }

            if(columns.length !== data.length) {
                return {
                    ...DBStatusEnum.parameterLengthError
                };
            }

            sql = `INSERT INTO ${table} ${_generateColumnsString(columns)} VALUES ${_generateDataString(data)}`;

            console.log(sql);

            try {
                // await oracleDbConnector.connection.execute(sql, data);

                return {
                    ...DBStatusEnum.success
                };
            } catch (e) {
                return {
                    ...DBStatusEnum.executeError
                };
            }
        }
    };
})();