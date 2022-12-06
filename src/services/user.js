import oracleDbHelper from '../db/index.js';
import { TypeChecker } from '../utils/index.js';
import UserQuery from '../query/user.js';

/**
 * The user services for CRUD.
 * 
 * @type { Object }
 * 
 * @description
 * + create - 유저 1명 생성
 * + find - 유저 1명 검색
 * + search - 유저 여러 명 검색
 * + update - 유저 1명 정보 업데이트
 * + delete - 유저 1명 삭제
 */
const UserServices = {
    /**
     * @namedparam
     * @param { String } account - 유저 계정
     * @param { String } password - 유저 비밀번호
     * @param { String } nickname - 유저 닉네임
     * @param { String } profile - 유저 프로필
     * @param { Number } disclosure - 유저 정보 공개 범위
     * 
     * @return { Object } 
     * ```js
     * // 유저 생성이 정상적으로 완료되고, 해당 정보가 DB에 저장 됐을 경우
     * { status : true} 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 생성이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
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
    /**
     * @namedparam
     * @param { String } account - 유저 계정
     * 
     * @description
     * 유저를 1명 찾을 때 사용하는 함수입니다.
     * 
     * @return { Object } 
     * ```js
     * // 유저를 찾았을 때
     * { 
     *      status : true,
     *      data: [
     *          0, // id
     *          "testAccount", // account
     *          "test@123", // password
     *          "testNickname", // nickname
     *          "testProfile", // profile
     *          0, // disclosure
     *          16908743092814, // create_at, timestamp 형식
     *          16908743092814 // update_at, timestamp 형식
     *      ]
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
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
    /**
     * @namedparam
     * @param { String } nickname - 유저 닉네임
     * 
     * @description
     * 유저를 1명 찾을 때 사용하는 함수입니다.
     * 
     * @return { Object } 
     * ```js
     * // 유저를 찾았을 때
     * { 
     *      status : true,
     *      data: [
     *          0, // id
     *          "testAccount", // account
     *          "test@123", // password
     *          "testNickname", // nickname
     *          "testProfile", // profile
     *          0, // disclosure
     *          16908743092814, // create_at, timestamp 형식
     *          16908743092814 // update_at, timestamp 형식
     *      ]
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
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
    /**
     * @namedparam
     * @param { String } nickname - 유저 닉네임
     * 
     * @description
     * 유저를 여러 명 찾을 때 사용하는 함수입니다. 친구 목록을 검색할 때 쓰시면 됩니다.
     * 
     * @return { Object } 
     * ```js
     * // 해당 닉네임을 포함하고 있는 모든 유저 목록
     * { 
     *      status : true,
     *      data: [
     *          [
     *              0, // id
     *              "testAccount", // account
     *              "test@123", // password
     *              "testNickname", // nickname
     *              "testProfile", // profile
     *              0, // disclosure
     *              16908743092814, // create_at, timestamp 형식
     *              16908743092814 // update_at, timestamp 형식
     *          ],
     *          [
     *              1, // id
     *              "testAccount2", // account
     *              "test@123", // password
     *              "testNickname2", // nickname
     *              "testProfile", // profile
     *              0, // disclosure
     *              16908743092814, // create_at, timestamp 형식
     *              16908743092814 // update_at, timestamp 형식
     *          ],
     *      ]
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
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
    /**
     * @namedparam
     * @param { String } nickname - 유저 닉네임
     * @param { Number } start - 시작 index
     * @param { Number } end - 마지막 index
     * 
     * @description
     * 
     * 해당 닉네임을 포함하고 있는 유저 목록 중, 일부분만 가져오고 싶을 때 사용합니다.
     * 주의해야할 점은 시작 index는 1부터 입력하셔야 합니다. 0이 아닙니다.
     * 
     * @return { Object } 
     * ```js
     * // 해당 닉네임을 포함하고 있는 유저 목록 중, 1번부터 2번 유저까지 가져올 때
     * { 
     *      status : true,
     *      data: [
     *          [
     *              0, // id
     *              "testAccount", // account
     *              "test@123", // password
     *              "testNickname", // nickname
     *              "testProfile", // profile
     *              0, // disclosure
     *              16908743092814, // create_at, timestamp 형식
     *              16908743092814 // update_at, timestamp 형식
     *          ],
     *          [
     *              1, // id
     *              "testAccount2", // account
     *              "test@123", // password
     *              "testNickname2", // nickname
     *              "testProfile", // profile
     *              0, // disclosure
     *              16908743092814, // create_at, timestamp 형식
     *              16908743092814 // update_at, timestamp 형식
     *          ],
     *      ]
     * } 
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 검색이 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
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
    /**
     * @namedparam
     * @param { String } account - 유저 계정
     * @param { String } password - 유저 비밀번호
     * @param { String } nickname - 유저 닉네임
     * @param { String } profile - 유저 프로필
     * @param { Number } disclosure - 유저 정보 공개 범위
     * 
     * @description
     * 
     * 해당 계정을 가지고 있는 유저의 정보를 업데이트 합니다.
     * 
     * @return { Object } 
     * ```js
     * // 해당 유저의 정보를 업데이트 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 업데이트가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
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
    /**
     * @namedparam
     * @param { String } account - 유저 계정
     * @param { String } password - 유저 비밀번호
     * @param { String } nickname - 유저 닉네임
     * @param { String } profile - 유저 프로필
     * @param { Number } disclosure - 유저 정보 공개 범위
     * 
     * @description
     * 
     * 해당 닉네임을 가지고 있는 유저의 정보를 업데이트 합니다.
     * 
     * @return { Object } 
     * ```js
     * // 해당 유저의 정보를 업데이트 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 업데이트가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
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
    /**
     * @namedparam
     * @param { String } account - 유저 계정
     * 
     * @description
     * 
     * 해당 계정을 가지고 있는 유저의 정보를 삭제 합니다.
     * 
     * @return { Object } 
     * ```js
     * // 해당 유저의 정보를 삭제 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 삭제가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
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
    /**
     * @namedparam
     * @param { String } nickname - 유저 닉네임
     * 
     * @description
     * 
     * 해당 계정을 가지고 있는 유저의 정보를 삭제 합니다.
     * 
     * @return { Object } 
     * ```js
     * // 해당 유저의 정보를 삭제 하고, 해당 정보를 DB에 저장했을 경우
     * { status : true }
     * 
     * // parameter 타입이 맞지 않을 경우
     * // 유저 삭제가 완료되지 않았을 경우
     * // 해당 정보가 DB에 저장되지 않았을 경우
     * { status : false }
     * ```
     */
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

Object.freeze(UserServices);

export default UserServices;