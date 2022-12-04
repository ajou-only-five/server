import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import UserQuery from '../query/user.js';

export default {
    createUser: async ({ account, password, nickname, profile, disclosure }) => {
        if (!TypeChecker.isString(account)) {
            return { status: false };
        }

        if (!TypeChecker.isString(password)) {
            return { status: false };
        }

        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        if (!TypeChecker.isString(profile)) {
            return { status: false };
        }

        if (isNaN(disclosure)) {
            return { status: false };
        }

        const data = [
            account,
            password,
            nickname,
            profile,
            disclosure,
            Date.now(),
            Date.now(),
        ];

        try {
            await oracleDbHelper.connection.execute(UserQuery.createUser, data);
            await oracleDbHelper.connection.commit();
            return { status: true };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    findUserByAccount: async ({ account }) => {
        if (!TypeChecker.isString(account)) {
            console.log(account);
            return { status: false };
        }

        const data = [
            account,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.findUserByAccount, data);
            return { status: true, data: result.rows[0] };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    findUserByNickname: async ({ nickname }) => {
        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        const data = [
            nickname,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.findUserByAccount, data);
            return { status: true, data: result.rows[0] };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    searchUserByNickname: async ({ nickname }) => {
        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        const data = {
            nickname: nickname
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.searchUsersByNickname(data));
            return { status: true, data: result.rows };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    searchUserByNicknameBetween: async ({ nickname, start, end }) => {
        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        if (isNaN(start)) {
            return { status: false };
        }

        if (isNaN(end)) {
            return { status: false };
        }

        const data = {
            nickname: nickname,
            start: start,
            end: end
        };

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.searchUsersByNicknameBetween(data));
            return { status: true, data: result.rows };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    updateUserByAccount: async ({ account, password, nickname, profile, disclosure }) => {
        if (!TypeChecker.isString(account)) {
            return { status: false };
        }

        if (!TypeChecker.isString(password)) {
            return { status: false };
        }

        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        if (!TypeChecker.isString(profile)) {
            return { status: false };
        }

        if (isNaN(disclosure)) {
            return { status: false };
        }

        const data = [
            nickname,
            profile,
            disclosure,
            Date.now(),
            account,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.updateUserByAccount, data);
            await oracleDbHelper.connection.commit();
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    updateUserByNickname: async ({ account, password, nickname, profile, disclosure }) => {
        if (!TypeChecker.isString(account)) {
            return { status: false };
        }

        if (!TypeChecker.isString(password)) {
            return { status: false };
        }

        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        if (!TypeChecker.isString(profile)) {
            return { status: false };
        }

        if (isNaN(disclosure)) {
            return { status: false };
        }

        const data = [
            nickname,
            profile,
            disclosure,
            Date.now(),
            nickname,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.updateUserByNickname, data);
            await oracleDbHelper.connection.commit();
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    deleteUserByAccount: async ({ account }) => {
        if (!TypeChecker.isString(account)) {
            return { status: false };
        }

        const data = [
            account
        ];

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.deleteUserByAccount, data);
            await oracleDbHelper.connection.commit();
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
    deleteUserByNickname: async ({ nickname }) => {
        if (!TypeChecker.isString(nickname)) {
            return { status: false };
        }

        const data = [
            nickname,
        ];

        try {
            const result = await oracleDbHelper.connection.execute(UserQuery.deleteUserByNickname, data);
            await oracleDbHelper.connection.commit();
            return { status: true, data: result };
        } catch (e) {
            console.log(e);
            return { status: false };
        }
    },
}